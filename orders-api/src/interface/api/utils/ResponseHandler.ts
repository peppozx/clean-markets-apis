export type ApiResponse = {
    statusCode: number;
    body: any;
};

export class ResponseHandler {
    static ok(body: {}): ApiResponse {
        return {
            statusCode: 200,
            body,
        };
    }

    static created(body: {}): ApiResponse {
        return {
            statusCode: 201,
            body,
        };
    }

    static error(statusCode: number, body: {}): ApiResponse {
        return {
            statusCode: statusCode,
            body,
        };
    }
}
