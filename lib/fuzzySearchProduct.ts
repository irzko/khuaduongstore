interface SearchWeights {
  name: number;
  category: number;
  description: number;
}

interface SearchOptions {
  threshold?: number;
  includeDescription?: boolean;
  boostExactMatches?: boolean;
  customWeights?: Partial<SearchWeights>;
}

export function fuzzySearchProduct(
  products: IProduct[],
  searchTerm: string,
  options: SearchOptions = {}
): IProduct[] {
  const defaultWeights: SearchWeights = {
    name: 1,
    category: 0.3,
    description: 0.2
  };

  const {
    threshold = 0.4,
    includeDescription = true,
    boostExactMatches = true,
    customWeights = defaultWeights
  } = options;

  // Ensure all weight properties exist with fallback to defaults
  const weights: SearchWeights = {
    name: customWeights.name ?? defaultWeights.name,
    category: customWeights.category ?? defaultWeights.category,
    description: customWeights.description ?? defaultWeights.description
  };

  const synonyms = new Map([
    ['keo', ['keo ab', 'gp7', 'keo apollo', 'a300', 'apollo']],
    // ... rest of synonyms map stays the same
  ]);

  const normalizeCache = new Map<string, string>();
  
  const normalizeStr = (str: string): string => {
    if (!str) return '';
    
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

    for (const [main, aliases] of synonyms.entries()) {
      if (aliases.some(alias => normalized.includes(alias))) {
        normalized = normalized.replace(new RegExp(aliases.join('|'), 'g'), main);
      }
    }

    normalizeCache.set(str, normalized);
    return normalized;
  };

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

        if (matrix[i][j] > maxDistance) return maxDistance + 1;
      }
    }

    return matrix[str1.length][str2.length];
  };

  const getNGrams = (str: string, n: number): Set<string> => {
    const ngrams = new Set<string>();
    for (let i = 0; i <= str.length - n; i++) {
      ngrams.add(str.slice(i, i + n));
    }
    return ngrams;
  };

  const getWordScore = (word: string, target: string): number => {
    const normalizedWord = normalizeStr(word);
    const normalizedTarget = normalizeStr(target);

    if (normalizedWord === normalizedTarget) return boostExactMatches ? 1.2 : 1;
    if (normalizedWord.includes(normalizedTarget) || normalizedTarget.includes(normalizedWord)) return 0.9;

    const n = Math.min(3, Math.min(normalizedWord.length, normalizedTarget.length));
    if (n < 2) return 0;

    const wordNGrams = getNGrams(normalizedWord, n);
    const targetNGrams = getNGrams(normalizedTarget, n);
    const intersection = new Set([...wordNGrams].filter(x => targetNGrams.has(x)));
    const ngramScore = (2.0 * intersection.size) / (wordNGrams.size + targetNGrams.size);

    const maxDistance = Math.floor(Math.max(normalizedWord.length, normalizedTarget.length) * 0.4);
    const distance = getLevenshteinDistance(normalizedWord, normalizedTarget, maxDistance);
    const levenScore = 1 - (distance / Math.max(normalizedWord.length, normalizedTarget.length));

    return Math.max(ngramScore, levenScore);
  };

  const getContextScore = (
    product: IProduct,
    searchTerms: string[],
    fieldName: keyof SearchWeights
  ): number => {
    const fieldValue = (product[fieldName] || '').toString();
    if (!fieldValue) return 0;

    const words = normalizeStr(fieldValue).split(/\s+/);
    let totalScore = 0;
    let matchedTerms = 0;
    const termWeights = searchTerms.map(term => Math.min(1.5, 1 + term.length * 0.1));

    const normalizedField = normalizeStr(fieldValue);
    const consecutiveMatches = searchTerms
      .map(term => normalizeStr(term))
      .filter(term => normalizedField.includes(term));
    
    if (consecutiveMatches.length > 1) {
      totalScore += 0.2 * (consecutiveMatches.length - 1);
    }

    searchTerms.forEach((searchTerm, termIndex) => {
      let maxWordScore = 0;
      
      for (const word of words) {
        const score = getWordScore(word, searchTerm);
        maxWordScore = Math.max(maxWordScore, score);
      }

      if (maxWordScore > 0) {
        matchedTerms++;
        totalScore += maxWordScore * termWeights[termIndex];
      }
    });

    return matchedTerms > 0
      ? (totalScore / searchTerms.length) * weights[fieldName]
      : 0;
  };

  const searchTerms = normalizeStr(searchTerm)
    .split(/\s+/)
    .filter(term => term.length > 0);

  if (searchTerms.length === 0) return [];

  const scoreCache = new Map<string, number>();

  return products
    .map(product => {
      const cacheKey = `${product.id}_${searchTerm}`;
      let score = scoreCache.get(cacheKey);
      
      if (score === undefined) {
        const nameScore = getContextScore(product, searchTerms, 'name');
        const categoryScore = getContextScore(product, searchTerms, 'category');
        const descriptionScore = includeDescription 
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
