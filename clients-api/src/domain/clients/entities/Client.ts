export class Client {
    name: string;
    email: string;
    token?: string;
    id?: string;
    constructor(nome: string, email: string, token?: string, id?: string) {
        this.id = id;
        this.name = nome;
        this.email = email;
        this.token = token;
    }
}