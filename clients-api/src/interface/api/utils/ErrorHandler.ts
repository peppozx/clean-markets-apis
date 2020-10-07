import AppError, { AppErrorType } from '../../../domain/shared/AppError';
import { ResponseHandler } from './ResponseHandler';

class ErrorHandler {
    private namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    /**
     * @description Handles AppErrors properly, returning the appropriate HTTP Response.
     * This method could later be moved to the shared folder
     * @param {AppError} error The AppError object that was thrown by the application.
     * @returns {Object} An error object returned from the appropriate apiResponse.
     */
    handle(error: Error, log: any) {
        // TODO: Abstração de uma interface para log
        log.error({
            namespace: this.namespace,
            msg: error.message,
            stackTrace: error,
        });

        if (error instanceof AppError) {
            const trustedError = {
                message: error.message,
                details: error.details,
            };

            // TODO: Refatorar trecho de código
            if (error.type === AppErrorType.VALIDATION) {
                return ResponseHandler.error(400, trustedError);
            } else if (error.type === AppErrorType.NOT_IMPLEMENTED) {
                return ResponseHandler.error(501, trustedError);
            } else if (error.type === AppErrorType.NOT_FOUND) {
                return ResponseHandler.error(404, trustedError);
            } else if (error.type === AppErrorType.FORBIDDEN) {
                return ResponseHandler.error(403, trustedError);
            } else if (error.type === AppErrorType.UNAUTHORIZED) {
                return ResponseHandler.error(401, trustedError);
            } else if (error.type === AppErrorType.BAD_REQUEST) {
                return ResponseHandler.error(400, trustedError);
            }
        }

        return ResponseHandler.error(500, {
            message: 'Internal Server Error',
            details: error.message,
        });
    }
}

export default ErrorHandler;
