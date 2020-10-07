import IValidator from "../../../../interface/api/validator/IValidator";
import { IOrdersRepository } from "../../../../domain/orders/repositories/IOrdersReposity";


export class GetOrderByIdService {
    constructor(
        private readonly validator: IValidator,
        private readonly ordersRepository: IOrdersRepository,
    ) { }

    async execute(orderId: string) {
        return await this.ordersRepository.getOrderById(orderId);
    }

    validate(orderId: string) {
        this.validator.validate(
            {
                orderId,
            },
            {
                orderId: {
                    required: true,
                    type: 'string',
                }
            }
        )
    }
}