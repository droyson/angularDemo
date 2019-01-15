
export class Item {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    dimension: string;
    selectedQuantity: number;

    constructor({ id, name, imageUrl, service1, service2, service3 }: any) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.quantity = parseInt(service1);
        this.price = Number(service2);
        this.dimension = service3;
        this.selectedQuantity = 0;
    }
}