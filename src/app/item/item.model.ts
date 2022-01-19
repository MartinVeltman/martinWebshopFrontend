export class Item {
  public name: string;
  public description: string;
  public price: number;
  public imagePath: string;
  public id: number;
  public qty: number;

  constructor(
    name: string,
    description: string,
    price: number,
    imagePath: string,
    id: number,
    qty: number
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.imagePath = imagePath;
    this.id = id;
    this.qty = qty;
  }
}
