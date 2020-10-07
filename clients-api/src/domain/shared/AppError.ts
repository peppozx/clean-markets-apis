export enum AppErrorType {
    VALIDATION = 'validation', // Simple validation errors
    NOT_FOUND = 'not_found', // Should be used when some entity referenced by the request does not exist in database
    FORBIDDEN = 'forbidden', // Should be used when the user is not allowed to do what he requested.
    NOT_IMPLEMENTED = 'not_implemented', // Should be used when the user tried to access some functionality that has not been implemented yet.,
    UNAUTHORIZED = 'unauthorized',
    BAD_REQUEST = 'bad_request',
    INTERNAL_SERVER_ERROR = 'internal_server_error',
}

export type ErrorDetail = {
    context: string;
    message: string;
};

class AppError extends Error {
    type: AppErrorType;
    details?: ErrorDetail[];

    constructor(type: AppErrorType, message: string, details?: ErrorDetail[]) {
        super(message);
        this.type = type;
        this.message = message;
        this.details = details;
    }
}

export default AppError;
