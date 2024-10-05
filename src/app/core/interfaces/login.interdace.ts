export interface Login{
    email: string,
    password: string
}

export interface LoginResponse{
    token: string,
    expiresIn: number
}

export interface Refresh extends Omit<LoginResponse, 'expiresIn'>{}