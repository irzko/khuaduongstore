export function fuzzySearchProduct(
  products: IProduct[],
  searchTerm: string,
  options: {
    threshold?: number;
    includeDescription?: boolean;
    boostExactMatches?: boolean;
    customWeights?: {
      name?: number;
      category?: number;
      description?: number;
    };
  } = {}
): IProduct[] {
  const {
    threshold = 0.4,
    includeDescription = true,
    boostExactMatches = true,
    customWeights = { name: 1, category: 0.3, description: 0.2 }
  } = options;

  // Cải tiến chuẩn hóa chuỗi với xử lý từ đồng nghĩa và viết tắt
  const synonyms = new Map([
  // Keo
  ['keo', ['keo ab', 'gp7', 'keo apollo', 'a300', 'apollo']],
  
  // Bóng đèn
  ['bong den', ['bong led', 'den led', 'led bulb', 'bong tru', 'tru nhom', 't50', 
    'bulb tru', 'den tho', 'bong thờ', 'den thờ', 'qua nhot']],
  ['den', ['bong', 'led', 'bulb']],
  
  // Màu sắc đèn
  ['mau', ['do', 'xanh la', 'vang', 'trang', 'red', 'green', 'yellow', 'white']],
  
  // Công suất đèn
  ['cong suat', ['50w', '50 w', 'w50']],
  
  // Thương hiệu
  ['thuong hieu', ['rang dong', 'sopoka', 'nanoco', 'panasonic', 'decom', 'yeti']],
  
  // Đui đèn
  ['dui den', ['dui', 'phich', 'dui lien phich']],
  
  // Thiết bị điện
  ['thiet bi dien', ['aptomat', 'mcb', 'rcbo', 'rccb', 'cb coc', 'chong giat']],
  ['aptomat', ['mcb', 'cb', 'rcbo', 'rccb']],
  
  // Thông số kỹ thuật
  ['thong so', ['1 pha', '2p', '2 cuc', '30a', '40a', '50a', '63a', '30ma', 
    '2200w', '3000w', '6000w']],
  
  // Ổ cắm
  ['o cam', ['o cam dien', 'phich cam', 'dau noi', 'chia dien']],
  ['dac diem o cam', ['khong day', 'co day', 'chiu nhiet', 'chiu tai', 'sieu chiu tai',
    'loi su']],
  
  // Báo động
  ['bao dong', ['chong trom', 'bao khach', 'hong ngoai', 'am thanh', 'chuong roi']],
  
  // Thiết bị chuyên dụng
  ['thiet bi chuyen dung', ['dao dien', 'inverter', 'but thu dien', 'sung kho',
    'flame gun', 'bo chia', 'luc giac']],
  
  // Đặc điểm sản phẩm
  ['dac diem', ['thong minh', 'da nang', 'khong day', 'lien phich', 'sieu chiu tai',
    'chiu nhiet']],
  
  // Đơn vị đo
  ['don vi', ['w', 'ma', 'a', 'v', 'watt', 'ampere', 'volt']],
  
  // Loại sản phẩm
  ['loai', ['den', 'keo', 'aptomat', 'o cam', 'bao dong', 'dung cu', 'thiet bi']],
  
  // Vật liệu
  ['vat lieu', ['nhom', 'su', 'nhua', 'kim loai']],
  
  // Tính năng
  ['tinh nang', ['chong giat', 'chong trom', 'chiu nhiet', 'chiu tai', 'thong minh',
    'da nang', 'khong day']],
]);

  const normalizeCache = new Map<string, string>();
  
  const normalizeStr = (str: string): string => {
    if (normalizeCache.has(str)) {
      return normalizeCache.get(str)!;
    }

    let normalized = str
      .toLowerCase()
      .replace(/[đĐ]/g, 'd')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();

    // Xử lý từ đồng nghĩa
    for (const [main, aliases] of synonyms.entries()) {
      if (aliases.some(alias => normalized.includes(alias))) {
        normalized = normalized.replace(new RegExp(aliases.join('|'), 'g'), main);
      }
    }

    normalizeCache.set(str, normalized);
    return normalized;
  };

  // Cải tiến Levenshtein với ngưỡng tối đa
  const getLevenshteinDistance = (str1: string, str2: string, maxDistance: number): number => {
    if (Math.abs(str1.length - str2.length) > maxDistance) return maxDistance + 1;
    
    const matrix: number[][] = Array(str1.length + 1)
      .fill(null)
      .map(() => Array(str2.length + 1).fill(0));

    for (let i = 0; i <= str1.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= str2.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );

        // Tối ưu: dừng sớm nếu vượt ngưỡng
        if (matrix[i][j] > maxDistance) return maxDistance + 1;
      }
    }

    return matrix[str1.length][str2.length];
  };

  // Cải tiến tính điểm với N-gram và context matching
  const getNGrams = (str: string, n: number): Set<string> => {
    const ngrams = new Set<string>();
    for (let i = 0; i <= str.length - n; i++) {
      ngrams.add(str.slice(i, i + n));
    }
    return ngrams;
  };

  const getWordScore = (word: string, target: string): number => {
    word = normalizeStr(word);
    target = normalizeStr(target);

    // Xử lý khớp chính xác
    if (word === target) return boostExactMatches ? 1.2 : 1;
    if (word.includes(target) || target.includes(word)) return 0.9;

    // Tính điểm dựa trên N-gram
    const n = Math.min(3, Math.min(word.length, target.length));
    if (n < 2) return 0;

    const wordNGrams = getNGrams(word, n);
    const targetNGrams = getNGrams(target, n);
    const intersection = new Set([...wordNGrams].filter(x => targetNGrams.has(x)));
    const ngramScore = (2.0 * intersection.size) / (wordNGrams.size + targetNGrams.size);

    // Kết hợp với Levenshtein
    const maxDistance = Math.floor(Math.max(word.length, target.length) * 0.4);
    const distance = getLevenshteinDistance(word, target, maxDistance);
    const levenScore = 1 - (distance / Math.max(word.length, target.length));

    return Math.max(ngramScore, levenScore);
  };

  // Cải tiến tính điểm tổng thể với context matching
  const getContextScore = (
    product: IProduct,
    searchTerms: string[],
    fieldName: keyof typeof customWeights
  ): number => {
    const fieldValue = product[fieldName]?.toString() || '';
    if (!fieldValue) return 0;

    const words = normalizeStr(fieldValue).split(/\s+/);
    let totalScore = 0;
    let matchedTerms = 0;
    const weights = searchTerms.map(term => Math.min(1.5, 1 + term.length * 0.1));

    // Tìm kiếm cụm từ liên tiếp
    const normalizedField = normalizeStr(fieldValue);
    const consecutiveMatches = searchTerms
      .map(term => normalizeStr(term))
      .filter(term => normalizedField.includes(term));
    
    if (consecutiveMatches.length > 1) {
      totalScore += 0.2 * (consecutiveMatches.length - 1);
    }

    // Tính điểm cho từng từ
    searchTerms.forEach((searchTerm, termIndex) => {
      let maxWordScore = 0;
      
      for (const word of words) {
        const score = getWordScore(word, searchTerm);
        maxWordScore = Math.max(maxWordScore, score);
      }

      if (maxWordScore > 0) {
        matchedTerms++;
        totalScore += maxWordScore * weights[termIndex];
      }
    });

    return matchedTerms > 0
      ? (totalScore / searchTerms.length) * customWeights[fieldName]
      : 0;
  };

  // Xử lý từ khóa tìm kiếm
  const searchTerms = normalizeStr(searchTerm)
    .split(/\s+/)
    .filter(term => term.length > 0);

  if (searchTerms.length === 0) return [];

  // Cache kết quả
  const scoreCache = new Map<string, number>();

  return products
    .map(product => {
      const cacheKey = `${product.id}_${searchTerm}`;
      let score = scoreCache.get(cacheKey);
      
      if (score === undefined) {
        // Tính điểm tổng hợp từ nhiều trường
        const nameScore = getContextScore(product, searchTerms, 'name');
        const categoryScore = product.category
          ? getContextScore(product, searchTerms, 'category')
          : 0;
        const descriptionScore = includeDescription && product.description
          ? getContextScore(product, searchTerms, 'description')
          : 0;

        score = nameScore + categoryScore + descriptionScore;
        scoreCache.set(cacheKey, score);
      }

      return { product, score };
    })
    .filter(item => item.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
}
