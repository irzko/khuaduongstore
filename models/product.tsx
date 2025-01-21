export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public image: string
  ) {}

  static fromJson(json: unknown): Product {
    const { id, name, price, image } = json as {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    return new Product(id, name, price, image);
  }

  public toString(): string {
    return `${this.id} ${this.name} (${this.price})`;
  }
}
