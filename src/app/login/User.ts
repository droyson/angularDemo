
export class User {
    public username: string;
    public password: string;

    constructor(username: string = '', password: string = '') {
        this.username = username;
        this.password = password;
    }
}

export const defaultUsers: User[] = [
    new User('admin', 'admin')
];