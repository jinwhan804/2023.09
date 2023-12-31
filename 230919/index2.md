# 이더리움

- 이더리움 만든 사람 : 비탈릭 부테린

- 이더리움 백서 : https://ethereum.org/ko/whitepaper/

# 차세대 스마트 컨트랙트와 탈 중앙화된 어플리케이션 플랫폼
- 비트코인의 보안을 조금 더 신경 쓴 느낌

- 비트코인과의 차이점 : 
- 비트코인은 결제에 포커스를 맞춰서 구현
- 이더리움은 탈 중앙화 어플리케이션을 제안
- 이더리움의 중요 키워드는 스마트 컨트랙트와 어플리케이션

- 블록체인 기술을 사용한 대안적인 어플리케이션이 몇 가지 존재
- 1. 사용자 정의 화폐, 금융 상품을 블록체인 위로 표현하기 위한 컬러드 코인
- 2. 물리적 대상의 소유권을 표현하는 스마트 자산
- 3. 도메인 이름과 같은 비동질적 자산을 기록하는 네임코인

- 임의적인 계약의 규칙을 구현한 코드에 의해 디지털 자산을 좀 더 관리하는게 편하도록 스마트 컨트랙트를 만들고
- 블록체인 기반의 자율 조직 DAO 등 생성

- 이더리움은 완벽한 튜링 완전 프로그래밍 언어가 심어진 블록 체인
- 튜링 완전에 대한 내용을 이해하기 위해서는 엘런 튜링이라는 인물에 대해 알아야 한다.
- 간단히 말하면 계산 가능한 문제를 해결할 수 있는 모든 기계의 공통된 능력

- 해당 프로그래밍 언어는 코딩된 규칙에 따라 어떤 상태를 다르게 변환 시키는 기능이 포함된 계약을 
- 유저가 작성할 수 있게 해서 설명한 시스템을 구현 가능하게 하여
- 상상하지 못한 어플리케이션들도 쉽게 만들 수 있도록 도와주는 것

- 역사(비트코인)
- 비트코인과 비슷한 암호화폐 만들기 시도는 계속 존재
- 중앙화 되어 있던 데이터 의존해 조명 받기 힘들었다.
- 사토시 나카모토가 합의 알고리즘(POW)의 사용으로 탈중앙화를 실현시킴

- 비탈릭 부테린은 작업 증명의 2가지 문제를 동시에 해결
1. 아주 간단하고 효과가 좋은 합의 알고리즘 제공
2. 누구나 합의 프로세스에 참여할 수 있다.

- 이 후 지분증명(POS)라는 새로운 방식의 합의 알고리즘이 등장
- POW : 각 노드가 가진 계산 능력을 통해 nonce를 증가시켜 hash 찾기
- POS : 화폐의 보유량에 따라 각 노드의 결정된 정도를 계산

- POW는 결국 컴퓨팅 파워가 많이 올라가다 보니 채굴에 급급한 마이너들이 그룹을 만들어 본인들끼리 보상을 나누어 먹는 형태로 변이
- 이 그룹이 커지면 결국 중앙화가 아니냐라는 말이 나옴

- 이런 문제 때문에 이더리움은 POS로 변경됨

# 상태 변환 시스템으로 비트코인
- 이더리움 백서에서는 비트코인의 트랜잭션을 상태 변환 시스템이라고 설명 (비트코인의 트랜잭션이 UTXO, 이더리움은 상태 처리로 설명)

- 지금까지 배운 내용 중 리액트의 상태와 유사한 것으로 생각할 수 있다.

- UTXO를 통해 계정의 account들의 balance를 구했고, 새로운 트랜잭션 처리가 되면 새로운 UTXO를 만들어주는 것을 상태로 비유한다.

# 스크립팅
- 비트코인에 정말 낮은 수준의 스마트 컨트랙트가 존재하는데 비탈릭 부테린은 서명에 관련된 로직을 스마트 컨트랙트 시점으로 바라본다.

- 비트코인의 UTXO는 공개키만으로 해당 계정의 잔액을 조회할 수 있다. (단순 스택의 기반으로 프로그래밍 언어로 표현)

- 2, 3개 개인키로 서명을 만들어 검증할 수 있도록 작성이 가능은 하지만 실제로 사용하는 플랫폼은 없다. (어렵고 실용성이 없음)

- 이 내용을 이더리움에서는 스마트 컨트랙트 개념으로 본다.

- 스크립팅의 문제 : 튜링 불안정성, 가치 없음, 다양한 상태 표현 불가, 블록 체인 해독 방법 없음

# 이더리움
- 이더리움의 목적은 분산 어플리케이션 제작을 위한 대체 프로토콜

- 이렇게 생산하는 이유

- 1. 비트코인을 가지고 예금, 보험 및 금융 상품에 대한 것을 구현할 수 없다. (이자도 구현 불가)
- 2. 사이트 및 게임에 적용하기 힘든 부분이 많다. (상품 및 게임 아이템 매칭 불가)

- 비트코인은 결제에 포커스가 맞춰져 있어 이 외 부분은 따로 처리를 해줘야 한다.

- 이더리움은 비트코인의 이러한 문제를 보안하여 플랫폼을 만든 것.

- 적은 시간으로 탈 중앙화를 사용해 데이터를 저장하는 사이트 혹은 게임을 생성할 수 있게 된 것. 이런 것들을 Dapp이라 부른다.

- 탈중앙화와 통신을 할 수 있는 프로토콜을 유저가 쉽게 구현할 수 있도록 도와준다.
- 탈중앙화에 데이터를 저장할 수 있다. === 스마트 컨트랙트

- 그로 인해 비트코인의 UTXO 형식적 데이터가 아닌 상태를 만들어 다양한 데이터를 저장하고 사용할 수 있는 트랜잭션 구조를 완전히 바꾼 것.

# 이더리움 어카운트
- 이더리움의 상태는 account라고 하는 객체로 구성

- 비트코인에서 개인키를 가지고 공개키를 만들고 여기서 12byte를 잘라서 만든게 account

```javascript
interface Account{
    nonce : number; // 트랜잭션의 횟수 카운트 (이중 지불 방지 용도)
    balance : string; // 이더 : 이더리움 화폐 단위
    storageRoot : string; // account의 상태 저장 공간. 초기에는 공란
    codeHash : string; // 스마트 컨트랙트 계약의 코드
}
```

- 트랜잭션을 발생 시킬 때 수수료를 지불하는데 이더리움 네트워크는 이더가 없으면 코드를 실행할 수 없게 하기 위해 이더 생성

- 이더가 없으면 데이터 저장도 안된다.

### account의 두 가지 개념
- EOA : 프라이빗 키에 의해 통제되는 외부 소유 account
- CA : 컨트랙트 코드에 의해 통제되는 컨트랙트 account

### EOA
- 비트코인의 지갑 개념. 다른 account와 이더를 주고 받을 수 있고 개인키가 존재하며 개인키를 가지고 서명을 해서 트랜잭션 생성

- 이더리움 백서에서는 메세지가 트랜잭션

- 위의 코드에서 storageRoot와 codeHash를 사용하지 않는다.

### CA
- EOA와 반대로 코드 내의 모든 속성을 사용한다.

- 솔리디티 언어로 스마트 컨트랙트 코드 작성 예정

```
pragma solldity ^0.8.0
contract testContract{
    uint256 value; // 상태 변수 선언
    function setValue(uint256 newValue) public {
        value = newValue; // 상태 변수를 변경
    }

    function getValue() public view returns (uint256) {
        return value; // 상태 변수 조회
    }
}
```

- codeHash에는 코드를 컴파일해서 결과 저장

- storageRoot에는 value 상태 변수를 값의 형태로 데이터를 저장

- CA는 메시지 발생시킬 수 없다. (개인키가 없기 때문)

- 메세지를 받으면 CA가 자신의 코드를 활성화 시키고 메세지의 값을 보고 읽거나 상태 변수의 내용을 변경하게 되거나 메세지를 보낼 수 있게 된다.

# 메세지와 트랜잭션
- 이더리움에서 서명이 있는 영수증은 트랜잭션이라 하고
- 서명이 없는 영수증을 메세지라고 한다.

- 즉 EOA는 트랜잭션, CA는 메세지

```javascript
interface Message{
    from : string; // 메세지를 보내는 account (컨트랙트 주소)
    to : string; // 메세지를 받는 account (컨트랙트 주소)
    gas : number; // 메세지를 처리하기 위해 사용할 가스의 양
    gasPrice : number; // 가스 가격
    value : number; // 메세지와 함께 전송할 이더의 양
    data : string; // 메세지 데이터
    nonce : number; // 메세지 전송한 account의 nonce (트랜잭션 발생 횟수)
}

interface Transaction extends Message {
    v : number; // 서명 v 값
    r : string; // 서명 r 값
    s : string; // 서명 s 값
}
```