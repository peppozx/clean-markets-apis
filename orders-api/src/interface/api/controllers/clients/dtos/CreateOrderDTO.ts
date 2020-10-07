import { ICreateOrderDTO } from "../../../../../domain/orders/dtos/ICreateOrderDTO";

export class CreateOrderDTO implements ICreateOrderDTO {
    productId: string;
    quantity: number;
    constructor(productId: string, quantity: number) {
        this.productId = productId;
        this.quantity = quantity;
    }
}