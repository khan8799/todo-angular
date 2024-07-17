export interface ILoginPayload {
    contact: number;
    password: string;
}

export interface ILoginResponse {
    token: string;
    message: string;
    user: IUser;
}

export interface ISignupPayload {
    contact: number;
    password: string;
}

export interface IAuthResponse {
    message: string;
    payload: IUser;
}

export interface IUser {
    _id: string;
    name: string;
    contact: number;
    password: string;
}