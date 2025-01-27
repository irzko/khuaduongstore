export function fuzzySearchProduct(
  products: IProduct[],
  searchTerm: string
): IProduct[] {
  // Chuẩn hóa chuỗi tìm kiếm
  const normalizeStr = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "");
  };

  // Tính điểm tương đồng của một từ
  const getWordScore = (word: string, target: string): number => {
    word = normalizeStr(word);
    target = normalizeStr(target);

    if (word === target) return 1;
    if (word.includes(target) || target.includes(word)) return 0.8;
    return 0;
  };

  // Tính điểm tương đồng tổng thể
  const getSimilarityScore = (
    productName: string,
    searchTerms: string[]
  ): number => {
    const productWords = normalizeStr(productName).split(/\s+/);
    let totalScore = 0;
    let matchedTerms = 0;

    // Với mỗi từ khóa tìm kiếm
    for (const searchTerm of searchTerms) {
      let maxWordScore = 0;

      // Tìm điểm cao nhất khi so với từng từ trong tên sản phẩm
      for (const productWord of productWords) {
        const score = getWordScore(productWord, searchTerm);
        maxWordScore = Math.max(maxWordScore, score);
      }

      if (maxWordScore > 0) {
        matchedTerms++;
        totalScore += maxWordScore;
      }
    }

    // Tính điểm cuối cùng dựa trên:
    // 1. Số từ khớp / tổng số từ tìm kiếm
    // 2. Điểm trung bình của các từ khớp
    return matchedTerms > 0
      ? (matchedTerms / searchTerms.length) * (totalScore / matchedTerms)
      : 0;
  };

  // Tách từ khóa tìm kiếm thành các từ riêng lẻ
  const searchTerms = normalizeStr(searchTerm)
    .split(/\s+/)
    .filter((term) => term.length > 0);

  // Điểm tương đồng tối thiểu
  const SIMILARITY_THRESHOLD = 0.5;

  // Tìm kiếm và sắp xếp kết quả
  return products
    .map((product) => ({
      product,
      score: getSimilarityScore(product.name, searchTerms),
    }))
    .filter((item) => item.score >= SIMILARITY_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}
