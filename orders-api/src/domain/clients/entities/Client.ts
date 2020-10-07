export class Client {
    name: string;
    email: string;
    token?: string;
    id?: string;
    constructor(
        name: string,
        email: string,
        token: string,
        id: string,
    ) {
        this.name = name;
        this.email = email;
        this.token = token;
        this.id = id;
    }
}
