import Block from '@core/block/block';
import { GENESIS } from '@core/config';
import { Failable } from '@core/interface/failable.interface';

class Chain{
    private chain : Block[] = [GENESIS];
    private readonly INTERVAL = 10;

    // 현재 체인을 반환하는 함수
    get(){
        return this.chain;
    }

    // 체인의 길이를 반환하는 함수
    length(){
        return this.chain.length;
    }

    // 체인의 마지막 블록 반환 함수
    latestBlock(){
        return this.chain[this.length() - 1];
    }

    // 블록 추가
    addToChain(receiveBlock : Block){
        this.chain.push(receiveBlock);
        return this.latestBlock();
    }

    // 블록 조회
    getBlock(callbackFn : (block : Block) => Boolean){
        const findBlock = this.chain.find(callbackFn);
        if(!findBlock) throw new Error('찾은 블록이 없음');
        return findBlock;
    }

    // 블록의 높이로 블록을 조회하는 함수
    getBlockByHeight(height : number){
        return this.getBlock((block : Block) => block.height === height);
    }

    // 블록의 해시로 블록을 조회하는 함수
    getBlockByHash(hash : string){
        return this.getBlock((block : Block) => block.hash === hash);
    }

    // 현재 위치에서 10번째 블록들을 찾는 함수
    getAdjustBlock(){
        const {height} = this.latestBlock();
        const findHeight = height < this.INTERVAL ? 1 : Math.floor(height / this.INTERVAL) * this.INTERVAL;
        return this.getBlockByHeight(findHeight);
    }

    // 다른 네트워크로 체인을 보낼 때 
    serialize(){
        return JSON.stringify(this.chain);
    }

    // 다른 네트워크에서 체인 받을 때
    deserialize(chunk : string){
        return JSON.parse(chunk);
    }

    // 상대방 체인과 본인의 체인 비교
    replaceChain(receivedChain : Block[]) : Failable<undefined, string>{
        // 본인과 상대방의 체인 검사 로직
        // 실제 네트워크에는 더 복잡한 로직이 들어가 있음
        // 전체 배경 확인 필요. 체인 길이 비교 로직 구현
        // 체인 길이 비교 : 롱기스트 체인 룰

        // 상대 체인 마지막 블록
        const latestReceivedBlock : Block = receivedChain[receivedChain.length - 1];

        // 본인 마지막 블록
        const latestBlock : Block = this.latestBlock();

        if(latestReceivedBlock.height === 0){
            return {isError : true, value : "상대방 네트워크 체인은 마지막 블록이 최초블록이다."};
        }

        if(latestReceivedBlock.height <= latestBlock.height){
            return {isError : true, value : "상대방 네트워크 체인보다 내 체인이 크거나 같다."};
        }
    
        // 상대 체인이 더 기면 내 체인을 상대 체인으로 업데이트
        this.chain = receivedChain;

        return {isError : false, value : undefined}
    }

    // 블록 생성 시점에서 이전 -10 번째 블록 구하기
    // 현재 높이값 < 10 : 최초블록 반환
    // 현재 높이값 > 10 : -10번째 블록 반환
    // 이전 10번째 블록 생성 시간 차이를 구해 그 차이가 블록 생성주기보다 빠르면 난이도 상승, 느리면 하락
    // 비트 코인 기준 10분에 1개 생산, 100분보다 빠르면 난이도 상승, 느리면 난이도 하락

    getAdjustmentBlock(){
        const currentLength = this.length();
        const adjustmentBlock : Block = this.length() < this.INTERVAL ? GENESIS : this.chain[currentLength - this.INTERVAL];

        return adjustmentBlock;
    }
}

export default Chain;