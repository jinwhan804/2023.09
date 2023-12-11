import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";
import fs from "fs";
import path from "path";

// 지갑 클래스 만들고 페이지에서 지갑 생성을 한번 확인해보기

// elliptic 인스턴스 생성
const ec = new elliptic.ec("secp256k1");

// 기본 지갑 정보 저장 경로
const dir = path.join(__dirname,"../../data");

// 지갑 클래스 정의
export class Wallet {
    public account : string;
    public privateKey : string;
    public publicKey : string;
    public balance : number;

    constructor(privateKey : string =""){
        // 생성단계에서 개인키값이 없으면 만들어 넣자.

        // ⭐⭐⭐
        // privateKey가 비어있으면 this.getPrivateKey() 실행,
        // 비어있지 않으면, privateKey로 사용 하는건데, 생성자 매개변수 privateKey 를 ""로 했기때문에
        // 무조건 비어있는걸로 설정됨.
        // ⭐⭐⭐
        this.privateKey = privateKey || this.getPrivateKey();
        console.log()
        this.publicKey = this.getPublicKey();
        this.account = this.getAccount();
        this.balance = 0;

        if(privateKey == "")
        Wallet.createWallet(this);

    }

    static createWallet(myWallet : Wallet){
        // fs 모듈로 파일 생성
        // 지갑을 생성하면 주소를 저장할 것
        // 주소안에는 개인 키 넣어보기
        const filename = path.join(dir,myWallet.account);
        const filecontent = myWallet.privateKey;
        fs.writeFileSync(filename, filecontent);
    }
    static getWalletList() : string[]{
        // readdirSync 폴더를 읽어서 안에있는 파일 내용을 배열로, 요소들은 문자열로 가져온다.
        const files : string[] = fs.readdirSync(dir);
        return files
    }

    // data폴더안에 해당하는 지갑주소를 찾아서 반환
    static getWalletPrivateKey(account : string) : string {
        const filename = path.join(dir,account);
        const filecontent = fs.readFileSync(filename);
        return filecontent.toString();
    }

    // 개인키 만들기
    public getPrivateKey() : string{
        // ⭐⭐⭐
        // 실제 블록체인에서 개인키는 64자리의 16진수로 설정되니깐
        // randomBytes(32)를 통해 32자리 랜덤바이트(256비트)를 생성 후 16진수 변환.
        // ⭐⭐⭐

        return randomBytes(32).toString("hex");
    }

    // 개인키로 공개키를 만들자
    public getPublicKey() : string {
        // ⭐⭐⭐
        // ec.keyFromPrivate 메서드는 elliptic 라이브러리에서 제공하는 메서드로, 
        // 개인 키를 사용하여 키 쌍(공개키)을 생성하는 역할
        const keyPair = ec.keyFromPrivate(this.privateKey);

        // keyPair는 키의 내부구조를 객체로 생성해주기때문에, encode()를 통해서
        // 16진수로 변환하고, false 의 의미는 높은 바이트 순으로 먼저 저장하겠다는 뜻.
        // true 이면 낮은 바이트 순으로 먼저 저장.
        // ⭐⭐⭐
        return keyPair.getPublic().encode("hex",false);
    }

    public getAccount() : string{
        return `${this.publicKey.slice(26).toString()}`
    }
    
}