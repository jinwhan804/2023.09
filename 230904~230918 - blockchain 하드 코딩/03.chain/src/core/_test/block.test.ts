// 테스트 코드를 작성하면 시간이 오래걸리긴 하지만 코드의 품질을 좀 더 올릴수 있다.

// 단위별로 테스트를 진행해서 디버깅을 하고 코드를 작성할수 있기 때문에

// 1단계 코드를 실행하고 2단계 코드를 실행하고 절차적으로 테스트를 우리가 진행을 해볼수가 있다.

import Block from "@core/block/block";
import Chain from "@core/chain/chain";

import { GENESIS } from "@core/config";

// describe : 테스트들의 그룹화 그룹을 지정할 수 있다.
// 첫번쨰 그룹의 명 이름 어떤 테스트 그룹인지.
// 두번째 매개변수로 테스트들을 실행시키는 콜백 함수

// describe("block 테스트 코드 그룹",()=>{
//     // 테스트들의 단위를 어떻게 작성하냐
//     // 하나의 테스트 단위 첫번째 매개변수에는 테스트 이름 명
//     // 두번째 매개변수는 테스트의 동작을 가지고 있는 콜백 함수.
//     it("제네시스 블록 테스트",()=>{
//         console.log(GENESIS);
//     })

// })

// describe : 테스트 코드의 그룹 단위
describe("block 검증 ", ()=>{
    let newBlock : Block;
    let newBlock2 : Block;
    let newChain : Chain;
    let newChain2 : Chain;

    // it 테스트할 코드의 최소 단위
    it("블록 추가", ()=>{
        const data =["Block 1"];
        newBlock = Block.generateBlock(GENESIS,data);
        // 블록의 난이도에 따른 마이닝을 동작해서 
        // 조건에 맞을때까지 연산을 반복한뒤에 생성된 블록을 newBlock에 받아온다.
        // 이전 블록은 GENESIS(최초 블록)
        console.log(newBlock);

        const data2 = ["Block 2"];
        newBlock2 = Block.generateBlock(newBlock,data2);
        console.log(newBlock2);
    })

    it("블록 유효성 검증",()=>{
        const isValideBlock = Block.isValidNewBlock(newBlock, GENESIS);
        if(isValideBlock.isError){
            // expect.toBe : 값이 맞는지 확인할 때 성공한 결과가 맞는지 확인할 때 사용하는 코드
            return expect(true).toBe(false);
        }
        expect(isValideBlock.isError).toBe(false);
    })

    it("블록 체인 추가",()=>{
        newChain = new Chain();
        newChain.addToChain(newBlock);
        
        console.log(newChain.get());
        console.log(newChain.getBlockByHeight(1));
    })

    it("네트워크에서 체인 비교(롱기스트 체인 룰 적용)",()=>{
        newChain2 = new Chain();
        newChain2.replaceChain(newChain.get());
        console.log(newChain2.get());
    })

    it("이전 10번째 블록 또는 최초 블록",()=>{
        for (let i = 0; i < 20; i++) {
            let block = new Block(GENESIS,['BLOCK'])
            newChain.addToChain(block);
        }
        console.log(newChain.getAdjustmentBlock());
    })
})