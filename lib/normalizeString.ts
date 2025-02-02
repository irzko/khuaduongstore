export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
    .replace(/[đĐ]/g, "d") // Xử lý chữ đ
    .replace(/[^a-z0-9\s]/g, " ") // Chỉ giữ lại chữ cái, số và khoảng trắng
    .replace(/\s+/g, " ") // Chuẩn hóa khoảng trắng
    .trim();
}
