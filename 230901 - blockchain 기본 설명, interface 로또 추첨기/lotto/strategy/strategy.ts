import { numberbox } from "../numberbox/numberbox";
import { AuthenticationResponse, Authenticator } from "./Authenticator";


interface IStrategy{
    [key : number] : Authenticator
}

class Strategy{
    private strategy : IStrategy = {}

    public set(key : number, authenticate : Authenticator){
        this.strategy[key] = authenticate;
    }

    public async NumberSelector(type : number,box : numberbox) : Promise<AuthenticationResponse>{
        const result = await this.strategy[type].authenticate(box);
        return result;
    }
}

export default Strategy;