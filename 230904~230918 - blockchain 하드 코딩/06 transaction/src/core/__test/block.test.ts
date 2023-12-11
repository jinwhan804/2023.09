// 테스트 코드를 작성하면 시간이 오래걸리긴하지만
// 코드의 품질을 좀더 올릴수있다.

// 단위별로 테스트르를 진행해서 디버깅을 하고 코드를 작성할수 있기 때문에

// 1 단계 코드를 실행하고 2 단계 코드를 실행하고 절차적으로 테스트를 우리가 진행을 해볼수가 있다.

import Block from "@core/block/block";
import Chain from "@core/chain/chain";

import { GENESIS } from "@core/config";

// describe : 테스트들의 그룹화 그룹을 지정할수 있다
// 첫번째는 그룹의 명 이름 어떤 테스트 그룹인지.
// 두번째 매개변수로 테스트들을 실행시키는 콜백 함수
// describe("block 테스트 코드 그룹", () => {
//     // 테스트들의 단위를 어떻게 작성하냐
//     // 하나의 테스트 단위 첫번째 매개변수에는 테스틑 이름 명
//     // 두번째 매개변수는 테스트의 동작을 가지고있는 콜백함수.
//     it("제네시스 블록 테스트", ()=>{
//         console.log(GENESIS);
//     })

// })

// describe : 테스트 코드의 그룹 단위

describe("block 검증", () => {
  let newBlock: Block;
  let newBlock2: Block;
  let newChain: Chain;
  let newChain2: Chain;

  // it 테스트할 코드의 최소 단위
  it("블록 추가", () => {
    const data = ["Block 1"];
    newBlock = Block.generateBlock(GENESIS, data, GENESIS);
    // 블록의 난이도에 따른 마이닝을 동작해서
    // 조건에 맞을때까지 연산을 반복한뒤에 생성된 블록을 newBlock에 받아온다.
    // 이전 블록은 GENESIS(최초 블록)
    console.log(newBlock);
    const data2 = ["Block 2"];
    newBlock2 = Block.generateBlock(newBlock, data2, GENESIS);
    console.log(newBlock2);
  });

  it("블록 유효성 검증", () => {
    const isValidBlock = Block.isValidNewBlock(newBlock, GENESIS);
    if (isValidBlock.isError) {
      //expect : toBe : 값이 맞는지 확인할때
      // 성공한결과가 맞는지 확인할때 사용하는 코드
      // true false 비교해서 맞는지 확인
      return expect(true).toBe(false);
    }
    expect(isValidBlock.isError).toBe(false);
  });

  it("블록 체인 추가", () => {
    newChain = new Chain();
    newChain.addToChain(newBlock);

    console.log(newChain.get());

    console.log(newChain.getBlockByHash(newBlock.hash));
  });

  it("네트워크 체인 비교(롱기스트 체인 룰)", () => {
    newChain2 = new Chain();
    newChain2.replaceChain(newChain.get());
    console.log(newChain2.get());
  });

  it("이전 10번째 블록 or 최초 블록", () => {
    // 현재 블록을 생성한다 가정하고
    // 현재 블록이 생성된 시간이 이전 10번째 블록으로부터 얼마나 걸렸는지
    // 확인을하고 블록의 정해진 생성 주기보다 빠르면 난이도를 올리고 아니면 내린다.

    for (let i = 0; i < 10; i++) {
      let block = Block.generateBlock(
        newChain.latestBlock(),
        ["block"],
        newChain.getAdjustmentBlock()
      );
      newChain.addToChain(block);
    }
    console.log(newChain.getAdjustmentBlock());
  });
});

// 지갑 구성
// 개인키, 공개키, 서명
// 지갑 주소 / 계정 만들기

// 개인키랑 공개키와 서명을 이용한 신원 인증 방식은 분산원장이라는 이해가 필요한데

// 분산 원장 : 복제 공유 동기화된 데이터에 대한 합의 기술

// 금융 쪽에서는 장부를 가지고 모든 거래내역을 기록하는 방식
// 은행이라는 금융 기관은 장부에 거래로 의존할수 밖에 없는 중앙 집권화된 방식

// 분산원장은 이것과 반대로 거래에 참여하는 모든 참여자들이 장부를 가지고 있고
// 거래가 발생했을때 해당 거래내역을 각자의 장부에 기록하는 방식
// 중앙에서만 가지고 있는게 아니라 모두 장부를 가지고 있다.

// 신원 인증 방식 분산원장 기술로 개인키, 공개키, 서명

// 암호화 방식

// 대칭형 : 암호화 복호화 할때 사용하는 키가 동일한 경우 1개를 사용한다.
//          암호화한 사람과 수신하는사람 또한 같은 키를 가지고 있어야 한다.

// 비대칭형 : 사용하는 키와 복호화 할때 사용하는 키가 다른 것 다른사람한테 절때
//           공개되어선 안되는 키(비밀키) 비밀키를 토대로 만든 공개키가 한쌍이다.
//           결론은 키를 2개 사용한다는것

// 공개키 : 사람들에게 공개할 키 정보를 암호화 할수 있다.
// 비밀키 : 사용자만 알아야하는 키 암호를 풀 수 있는키

// 대칭형
// 나 -> 원본 -> 대칭형으로 암호화 -> 암호문
// 너 -> 암호문 -> 대칭키로 복호화 -> 원본
// 대칭형의 형태는 암호문을 대칭키를 가지고 있는 사람은 누구나 전달이 가능하다.

// 비대칭형키의 경우는 암호화 할때 공개키로 암호화하고

// 나 -> 원본 -> 너의 공개키로 암호화 -> 암호문
// 너 -> 암호문 -> 너의 비밀키로 복호화 -> 원본

// 비밀키의 소유자가 비밀키로 데이터을 암호화 하고 공개키와 함께 전달한다.
// 공개키와 데이터를 획득한 사람은 공개키를 이용해서 복호화가 가능하고
// 이렇게 위험성이 보이는데 이방법을 사용하는 이유가 데이터의 보호 목적 보다는
// 공개키 데이터 제공한 사람의 신원을 보장해주기 때문
// 암호화된 데이터가 공개키로 복호화 된다것이 공개키와 쌍으로 이루는 비밀키에 의해서
// 암호화가 되었다는 뜻이기 때문에 데이터 제공자가 맞는지 확인해줘서 신원이 보장 된다는 뜻
// 이 방법이 공인 인증 체계의 기본바탕인 전자서명

// 1. 암호화 하고 싶은 데이터를 SHA256 방식으로 해싱하고.
// 2. 개인키를 사용해서 해시값으로 서명을 만들고.
// 3. 서명이랑 공개키를 제 3자한테 전달한다.
// 4. 받은 제 3자는 공개키를 이용해서 서명을 복호화하고
// 5. 복호화한 해시값과 데이터를 해싱해서 나온 값이 맞는지 확인

// 개인키 생성 테스트

// 실제 블록체인 네트워크 상에 개인키를 생성하는 방식은
// 256 자리의 2진수로 랜덤값을 64자리의 16진수 값으로 만든것이 개인키이고

// 개인키 작성

import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";

// 타원 곡선의 방정식
// y^2 = x^3 + ax + b
// 방정식을 만족하는 곡선

// secp256k1 비트코인과 이더리움에 사용되는 알고리즘
// 키 생성 및 디지털 서명(너가 이거 한거 맞음? 검증 영수증), 주소 생성에 사용
// 타원 곡선의 별명
// 송신자와 수신자 블록체인을 이용하는 모든 사용자들이 공통적으로 타원 곡선위의 한점을
// 알고있어야하는데 이 점을 타원곡선의 기준점 G 라고 부른다.
// 타원 곡선의 기준점 좌표가 뭐냐에 따라 타원 곡선 별명을 붙여준다.
// 비트코인과 이더리움에서 사용되는 타원곡선 별명은 secp256k1
// a가 0, b가 7, 기준점 G가 02 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798(x및 y 좌표를 16진수로 표현)
// y^2 = x^3 + 7

// A가
// 서명을 만들고 트랜잭션과 보낸다
// 영수증 만든다(트랜잭션)
// 볼펜준비 (개인키) 타원 곡선의 지정 범위 내에서 정한다. (1 ~ n - 1 까지의 정수)(범위내의 정수라는 뜻)
// secp256k1의 n은 1.157920892373162e+77 값(과학 표기법)
// 16진수로 변환하면 FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
// FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141에서 - 1 해서
// 즉 1 ~ FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140 까지의 숫자의 범위중 하나를 사용하는것.
// 이 범위를 초과하면 올바르지 않은 개인키라고 에러를 밷는다.
// 개인키를 임시로 FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF1234567891011

// 서명을 만들때 2개의 서명이 필요하다
// 서명 r, 서명 s

// 서명 r : 트랜잭션 보낼때 개인키 처럼 정수를 하나더 랜덤하게 골른다 이값을 k라고 한다. 서명 r = k * G(기준점)

// 서명 s : 공식 = k⁻¹ = (z + r * private key) mod n == k 역수 계산 z + r * private key 나머지 n
// k = 서명 r 에서 랜덤하게 선택한 값
// z = 만든 트랜잭션 정보
// r = 서명 r
// private key = 개인키로 정한 FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF1234567891011
// mod n = n으로 나눈 나머지

// 중요한건 서명 s를 만드는데 개인키를 사용했다는것.

// w 동일한 서명을 만들지 않기위한 임의 값 nonce 값이라고 보면됨
// w = s⁻¹ mod n

// 여기는 서명을 w에 곱한다고 생각하자.... 두 값은 서명 검증에 사용
// U1 = z * w mod n
// U2 = r * w mod n

// U1 * G + U2 * Public Key 값를 구해서 서명 r 과 같은지 비교해서 검증

// 데이터를 전송
// 1. 트랜잭션 생성
// 2. 개인키 생성
// 3. 서명 r, 서명 s 생성

// 데이터 수신
// 1. U1 * G + U2 * Public Key 값를 구해서 서명 r과 비교 (검증)

const ec = new elliptic.ec("secp256k1");

describe("지갑 만들기", () => {
  let privKey: string;
  let pubKey: string;
  let signature: elliptic.ec.Signature;

  it("개인키 생성", () => {
    // 256자리의 2진수 랜덤 값을 만들고 toString("hex")를 사용해서
    // 16 진수로 나타내줌
    privKey = randomBytes(32).toString("hex");
    console.log("개인키 : " + privKey);
    console.log("길이 : " + privKey.length);
  });

  it("공개키 생성", () => {
    const keyPair = ec.keyFromPrivate(privKey);
    pubKey = keyPair.getPublic().encode("hex", false);
    console.log("공개키 : " + pubKey);
    console.log("길이 : " + pubKey.length);
    // 공개키는 130자 문자열
  });

  it("서명 만들기", () => {
    // 개인키랑 hash 값이 필요해서 SHA256함수 사용
    const keyPair = ec.keyFromPrivate(privKey);
    const hash = SHA256("transaction data").toString();
    signature = keyPair.sign(hash, "hex");
    console.log("서명 : ", signature);
    // BN == BigNumber 무척 큰 number 타입
    // negative == 0 양수의 의미
    // words == r이나 s의 값을 32비트 정수 배열로 표시
    // length == 배열의 길이
    // 서명 :  Signature {
    //     r: BN {
    //       negative: 0,
    //       words: [
    //         37039886, 61881260,
    //         65481333,   328550,
    //         62645488, 58373952,
    //         46380834, 49670052,
    //         31689727,   473362
    //       ],
    //       length: 10,
    //       red: null
    //     },
    //     s: BN {
    //       negative: 0,
    //       words: [
    //         22476272, 58647581, 46127845, 48055214,
    //         60151034,  5722037, 33418996, 35867000,
    //         23287223,  1913698,        0,        0,
    //                0,        0,        0,        0,
    //                0,        0,        0,        0,
    //                0,        0,        0,        0,
    //                0,        0,        0,        0,
    //                0,        0
    //       ],
    //       length: 10,
    //       red: null
    //     },
    //     recoveryParam: 0
    //   }
  });

  // 마지막 검증하기
  // 해시값, 서명, 공개키
  // 공개키를 사용해서 서명을 복호화하고 나온 값이 해시와 동일하면 서명은
  // 공개키를 생성한 소유자에 의해 만들어진 서명인게 증명된다.
  it("검증하기", () => {
    // 필요한 값 : 서명, 공개키, hash
    const hash = SHA256("transaction data").toString();
    const verify = ec.verify(hash, signature, ec.keyFromPublic(pubKey, "hex"));
    console.log(verify);
  });

  // 계정 만들기
  it("지갑 주소", () => {
    // 이더리움 방식으로 계정을 만드는 방법은 만들어놓은 공개키에서 앞의
    // 26자리를 잘라내고 40자리만큼을 남겨주면 된다.
    // slice(26)을 넣은 이유가 불필요한 부분 제거
    // 0x는 가독성 주소의 앞에는 붙여주는것이 일반적(16진수 주소다 라는뜻)
    const addres = pubKey.slice(26).toString();
    console.log("계정 : " + `0x${addres}`);
  });
  // 동일한 내용을 "transaction data"이 값으로 해시값을 만들어서 검증에 사용한것이기 때문에
  // 검증에 성공한것 true반환

  // 설치 명령어
  // -------------------------------------------------------
  // npm install elliptic
  // npm i --save-dev @types/elliptic
  // -------------------------------------------------------

  // 블록체인 지갑의 서버
  // 지갑 프로그램(클라이언트) -> 지갑 서버(서버)(공개키와 서명) ->
  // 블록체인 http server -> 블록체인 P2P 네트워크

  // 지갑 서버 만들기
});


import Transaction from "@core/transaction/transaction";

describe("Transaction",()=>{
  let transaction : Transaction;

  // 테스트 케이스 실행 전에 실행되는 코드
  beforeEach(()=>{
    transaction = new Transaction();
  })

  describe('createTxOut',()=>{
    const account = "0".repeat(40);
    it('txOut 생성',()=>{
      const amount = 40;

      const txout = transaction.createTxOut(account, amount);

      console.log(txout);
      expect(txout.account).toBe(account);
      expect(txout.amount).toBe(amount);
    })
  })
})