import leven from "leven";
import { normalizeString } from "./normalizeString";

export const calculateSimilarity = (product1: IProduct, product2: IProduct) => {
  let score = 0;

  // Cùng danh mục (trọng số: 3)
  if (product1.category === product2.category) score += 3;

  // Khoảng giá tương tự (trọng số: 2)
  const priceDiff = Math.abs(product1.price - product2.price) / product1.price;
  if (priceDiff <= 0.3) score += 2;

  // Độ tương đồng tên sản phẩm (trọng số: 2)
  const nameSimilarity =
    1 -
    leven(normalizeString(product1.name), normalizeString(product2.name)) /
      Math.max(product1.name.length, product2.name.length);
  score += nameSimilarity * 2;

  return score;
};
