import type { ICredentialsResponse } from "../features/auth/authInterface"

export interface ICredentials {
    token: string,
    refresh_token: string
    setToken: ({token, refresh_token} : ICredentialsResponse) => void,
}

export type TErrorResponseData = {
    code: number,
    message: string
}