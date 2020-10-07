import IValidator from "../../../../interface/api/validator/IValidator";
import { IOrdersClient } from "../../clients/IOrdersClient";
import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO";
import { Client } from '../../../clients/entities/Client';
import AppError, { AppErrorType } from "../../../../domain/shared/AppError";
import { CreateOrderDTO } from "../../../../interface/api/controllers/clients/dtos/CreateOrderDTO";
import { Order } from "../../../../domain/orders/entities/Order";
import { Product } from "../../../../domain/products/entities/Product";
import { IOrdersRepository } from "../../../../domain/orders/repositories/IOrdersReposity";


export class CreateOrderService {
    constructor(
        private readonly validator: IValidator,
        private readonly ordersClient: IOrdersClient,
        private readonly ordersRepository: IOrdersRepository,
    ) { }

    async execute(currentClient: Client, createOrderDTO: ICreateOrderDTO[]) {
        if (!createOrderDTO.length) throw new AppError(AppErrorType.BAD_REQUEST, 'There must be at least one order');
        
        const products = await this.validateProductIds(createOrderDTO);
        const mapOrders = new Order(products, currentClient.id+'');
        await this.ordersRepository.createOrder(mapOrders);

        return await this.ordersRepository.getOrders();
    }

    private async validateProductIds(products: CreateOrderDTO[]): Promise<Product[]> {
        const availableProducts = await this.ordersClient.getProducts();
        return products.map(p => {
            const [productExists] = availableProducts.filter(ap => ap.id === p.productId);
            if (!productExists) {
                throw new AppError(AppErrorType.BAD_REQUEST, `There's no product with id ${p.productId}`);
            }
            return new Product(productExists.name, productExists.description, productExists.price, productExists.id, p.quantity);
        });
    }

    validate(createOrderDTO: ICreateOrderDTO[]) {
        this.validator.validate(
            {
                createOrderDTO,
            },
            {
                createOrderDTO: {
                    type: 'array',
                    required: true,
                    each: {
                        productId: {
                            required: true,
                            type: 'string',
                        },
                        quantity: {
                            required: true,
                            type: 'number',
                        }
                    }
                }
            }
        );
    }
}