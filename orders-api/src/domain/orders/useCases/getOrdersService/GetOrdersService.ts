import IValidator from "../../../../interface/api/validator/IValidator";
import { IOrdersRepository } from "../../../../domain/orders/repositories/IOrdersReposity";


export class GetOrdersService {
    constructor(
        private readonly validator: IValidator,
        private readonly ordersRepository: IOrdersRepository,
    ) { }

    async execute() {
        return await this.ordersRepository.getOrders();
    }

    validate() {
        this.validator.validate({}, {});
    }
}