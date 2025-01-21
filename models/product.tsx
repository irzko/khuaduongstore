export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public image: string,
    public description: string
  ) {}

  static fromJson(json: unknown): Product {
    const { id, name, price, image, description } = json as {
      id: string;
      name: string;
      price: number;
      image: string;
      description: string;
    };
    return new Product(id, name, price, image, description);
  }

  public toString(): string {
    return `${this.id} ${this.name} (${this.price}) ${this.image} ${this.description}`;
  }
}
