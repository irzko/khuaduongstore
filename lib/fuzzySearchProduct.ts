export function fuzzySearchProduct(
  products: IProduct[],
  searchTerm: string
): IProduct[] {
  // Cải tiến hàm chuẩn hóa chuỗi với cache
  const normalizeCache = new Map<string, string>();
  const normalizeStr = (str: string): string => {
    if (normalizeCache.has(str)) {
      return normalizeCache.get(str)!;
    }
    
    const normalized = str
      .toLowerCase()
      .replace(/[đĐ]/g, 'd')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
    
    normalizeCache.set(str, normalized);
    return normalized;
  };

  // Cải tiến tính điểm tương đồng với Levenshtein Distance
  const getLevenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= str1.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str2.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str1.length][str2.length];
  };

  // Cải tiến tính điểm tương đồng của từ
  const getWordScore = (word: string, target: string): number => {
    word = normalizeStr(word);
    target = normalizeStr(target);
    
    if (word === target) return 1;
    if (word.includes(target) || target.includes(word)) return 0.8;
    
    const maxLength = Math.max(word.length, target.length);
    const distance = getLevenshteinDistance(word, target);
    const similarity = 1 - distance / maxLength;
    
    return similarity > 0.6 ? similarity : 0;
  };

  // Cải tiến tính điểm tương đồng tổng thể với trọng số
  const getSimilarityScore = (
    productName: string,
    searchTerms: string[]
  ): number => {
    const productWords = normalizeStr(productName).split(/\s+/);
    let totalScore = 0;
    let matchedTerms = 0;
    const weights = new Array(searchTerms.length).fill(1);

    // Tăng trọng số cho các từ dài hơn
    searchTerms.forEach((term, index) => {
      if (term.length > 3) weights[index] = 1.2;
      if (term.length > 5) weights[index] = 1.4;
    });

    // Tính điểm cho từng từ khóa tìm kiếm
    searchTerms.forEach((searchTerm, termIndex) => {
      let maxWordScore = 0;
      
      for (const productWord of productWords) {
        const score = getWordScore(productWord, searchTerm);
        maxWordScore = Math.max(maxWordScore, score);
      }

      if (maxWordScore > 0) {
        matchedTerms++;
        totalScore += maxWordScore * weights[termIndex];
      }
    });

    // Tính điểm cuối cùng với các yếu tố:
    // 1. Tỷ lệ từ khớp
    // 2. Điểm trung bình có trọng số
    // 3. Độ dài chuỗi tìm kiếm
    const matchRatio = matchedTerms / searchTerms.length;
    const avgScore = matchedTerms > 0 ? totalScore / matchedTerms : 0;
    const lengthBonus = Math.min(1 + searchTerms.length * 0.1, 1.3);

    return matchedTerms > 0 ? (matchRatio * avgScore * lengthBonus) : 0;
  };

  // Xử lý từ khóa tìm kiếm
  const searchTerms = normalizeStr(searchTerm)
    .split(/\s+/)
    .filter(term => term.length > 0);

  if (searchTerms.length === 0) return [];

  const SIMILARITY_THRESHOLD = 0.4; // Giảm ngưỡng để tăng kết quả phù hợp

  // Cache kết quả tính toán để tăng hiệu suất
  const scoreCache = new Map<string, number>();

  return products
    .map(product => {
      const cacheKey = `${product.name}_${searchTerm}`;
      let score = scoreCache.get(cacheKey);
      
      if (score === undefined) {
        score = getSimilarityScore(product.name, searchTerms);
        scoreCache.set(cacheKey, score);
      }

      return { product, score };
    })
    .filter(item => item.score >= SIMILARITY_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
}
