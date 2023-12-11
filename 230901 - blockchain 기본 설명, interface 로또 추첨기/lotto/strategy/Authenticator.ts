import { numberbox } from "../numberbox/numberbox"

export interface AuthenticationResponse{
    success : boolean
}

export interface Authenticator{
    authenticate(box : numberbox) : Promise<AuthenticationResponse>
}