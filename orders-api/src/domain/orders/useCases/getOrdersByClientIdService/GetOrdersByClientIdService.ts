import IValidator from "../../../../interface/api/validator/IValidator";
import { IOrdersRepository } from "../../../../domain/orders/repositories/IOrdersReposity";


export class GetOrdersByClientIdService {
    constructor(
        private readonly validator: IValidator,
        private readonly ordersRepository: IOrdersRepository,
    ) { }

    async execute(clientId: string) {
        return await this.ordersRepository.getOrderByClientId(clientId);
    }

    validate(clientId: string) {
        this.validator.validate(
            {
                clientId,
            },
            {
                clientId: {
                    required: true,
                    type: 'string',
                }
            }
        )
    }
}