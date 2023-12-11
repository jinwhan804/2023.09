import { SHA256 } from "crypto-js";
import merkle from "merkle";
import { BlockHeader } from "./blockHeader";
import { IBlock,IBlockHeader } from "@core/interface/block.interface";
import { Failable } from "@core/interface/failable.interface";
import CryptoModule from "@core/crypto/crypto.module";

// block 형태를 클래스로 정의
class Block extends BlockHeader implements IBlock{
    merkleRoot: string;
    hash: string;
    nonce: number;
    difficulty: number;
    data: string[];

    constructor(_previousBlock : Block, _data : string[]){
        // 부모 클래스 생성자 호출 super
        super(_previousBlock);
        this.merkleRoot = Block.getMerkleRoot(_data);

        // 블록 본인의 데이터를 해시화한게 블록의 해시값
        this.hash = Block.createBlockHash(this);
        
        // 블록 채굴은 뒤에 추가
        // 지금은 0으로
        this.nonce = 0;

        // 지금은 난이도 3
        this.difficulty = 3;

        this.data = _data;
    }

    // 블록추가
    static generateBlock(_previousBlock : Block, _data:string[]) : Block{
        const generateBlock = new Block(_previousBlock, _data);
        // 마이닝을 통해서 블록의 생성 권한을 받은 블록을 받고 만들고
        const newBlock = Block.findBlock(generateBlock);
        return newBlock;
    }



    // 마이닝 작업 코드
    // 블록의 채굴
    // 연산을 통해서 난이도의 값에 따른 정답을 찾는 동작
    // findBlock = 동작의 이름은 마이닝 / 블록을 채굴하는 동작
    // POW : 작업 증명 블록의 난이도에 충족하는 값을 구하기 위해서 연산작업을 계속 진행해서 값을 조건에 충족하는
    // 값을 구하면 보상으로 블록의 생성 권한을 얻는다.

    static findBlock(generateBlock : Block){
        let hash : string;
        // nonce 변수는 블록의 채굴을 하는데 연산을 몇번 진행했는지 값을 여기에 담을것임.

        let nonce : number = 0;

        while(true){

            generateBlock.nonce = nonce;
            // nonce이 값을 증가시켜서 hash값을 계속 바꿔서
            nonce ++;
            // 블록 해시 구하는 구문 추가
            hash = Block.createBlockHash(generateBlock);

            // 16 진수 -> 2진수로 변환 해야하는데
            // 16 진수를 2진수로 변환해서 0의 갯수가 난이도의 갯수에 중족하는지 체크를 해서
            // 맞추면 블록 채굴의 권한을 받고 
            // 블록을 생성할 수 있다.
            
            // 충족되었는지 확인하려면 binary 2진 값이 바뀌는 이유는
            const binary : string = CryptoModule.hashToBinary(hash);
            console.log("binary : ",binary);
            // 연산의 값이 난이도에 충족했는지 체크할 변수
            // startsWith : 문자열의 시작이 매개변수로 전달된 문자열로 시작하는지 체크
            // "000" = 이문자열로 시작하는지 결과가 true false 반환되고
            const result : boolean = binary.startsWith("0".repeat(generateBlock.difficulty))
            console.log("result : ",result);
            // 조건을 충족 했으면 채굴할 수 있는 권한을 얻었고 조건에 충족해서 나온 값을 반환
            if(result){
                // 연산을 통해 완성된 hash 값과 
                generateBlock.hash = hash;
                // 완성된 블록을 내보내 주자
                return generateBlock;
            }
        }
    }
    // 블록의 해시를 구하는 함수
    static createBlockHash(_block: Block) : string{
        //
        const {version, timestamp, height, merkleRoot, previousHash, difficulty, nonce} = _block;
        const value : string = `${version}${timestamp}${height}${merkleRoot}${previousHash}${difficulty}${nonce}`
        return SHA256(value).toString();
    }

    // 머클루트 구하는 함수
    static getMerkleRoot<T>(_data : T[]) : string{
        const merkleTree = merkle("sha256").sync(_data);
        return merkleTree.root();
    }

    // 블록 유효성 검증
    static isValidNewBlock(_newBlock : Block,_previousBlock : Block) : Failable<Block, string> {
        
        // 블록 유효성 검사
        // 블록의 높이가 정상적인지
        if(_previousBlock.height + 1 !== _newBlock.height){
            return {isError : true, value : "높이 오류"};
        }
        
        // 이전 블록 해시 값이 새로운 블록의 이전 해시값과 동일한지
        if(_previousBlock.hash !== _newBlock.previousHash){
            return {isError : true, value : "이전 블록 해시 오류"};
        }
        
        // 생성된 블록의 정보를 통해 블록 값이 변조되었는지 확인
        if(Block.createBlockHash(_newBlock) !== _newBlock.hash){
            return {isError : true, value : "블록 해시 오류"}
        }
        // 블록이 정상적일 경우
        return {isError : false, value : _newBlock};
    }
}

export default Block;