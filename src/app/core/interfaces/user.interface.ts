
export interface User {
    name: string,
    email: string,
    password: string
}

export interface UserCreate extends Omit<User, 'password'>{
    id: number
}