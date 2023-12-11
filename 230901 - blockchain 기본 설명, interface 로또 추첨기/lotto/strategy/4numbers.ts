import { numberbox } from "../numberbox/numberbox";
import { AuthenticationResponse, Authenticator } from "./Authenticator";


export class FourNumberSelector implements Authenticator{
    async authenticate(box : numberbox): Promise<AuthenticationResponse> {
        for (let i = 1; i <= 45; i++) {
            box.box.push(i);
        }

        let resultNum : Array<number> = [];

        for (let i = 0; i < 4; i++) {
            
            let num = Math.floor(Math.random() * 45 + 1);

            if(box.box.includes(num)){
                box.box.splice(box.box.indexOf(num),1);
                resultNum.push(num);
            }else{
                i--;
            }
        }

        console.log("추첨 결과 : ", resultNum, "추첨된 숫자 갯수 : ", resultNum.length);
        console.log('박스 안에 남은 숫자 : ', box.box, '남은 숫자 갯수 : ', box.box.length);

        return {success : true}
    }
}