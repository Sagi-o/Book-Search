export class Login {
    static type = '[Auth] Login';
}

export class LoginSuccess {
    static type = '[Auth] Login Success';
    constructor(public username: string) {}
}

export class LoginError {
    static type = '[Auth] Login Error';
    constructor(public error: string) {}
}
