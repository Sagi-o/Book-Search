export class Login {
    static type = '[Auth] Login';
    constructor(public email: string, public password?: string) { }
}

export class LoginSuccess {
    static type = '[Auth] Login Success';
}

export class LoginError {
    static type = '[Auth] Login Error';
    constructor(public error: string) {}
}
