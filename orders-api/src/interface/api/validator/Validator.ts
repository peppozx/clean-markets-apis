import IValidator from './IValidator';
import Schema from 'validate';
import AppError, { AppErrorType } from '../../../domain/shared/AppError';

class Validator implements IValidator {
    constructor() { }

    validate(data: any, rules: any) {
        const valid = new Schema(rules);
        const errors = valid.validate(data);
        if (errors && errors.length) {
            throw new AppError(
                AppErrorType.VALIDATION,
                'Validation Error',
                errors.map((error: any) => ({
                    context: error.path,
                    message: error.message,
                }))
            );
        }
        return data;
    }

}

export default Validator;
