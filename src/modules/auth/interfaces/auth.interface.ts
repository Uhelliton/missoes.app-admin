export interface IAuthPayload {
    username: string
    password: string
}

export interface IAuthResponse {
    token: string
    user: {
        id: number
        name: string
        email: string
    }
}