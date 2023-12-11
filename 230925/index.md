# contract 실행

- 컨트랙트에 저장할 수 있는 영역. 데이터를 영구적으로 저장 가능
- contract storage에 데이터를 저장
- storage에 상태를 저장해서 유지시킬 수 있다.(블록체인 스마트 컨트랙트)
- 배포한 스마트 컨트랙트의 저장 공간이고 영구적으로 사용된다.

# code 작성 (js에서 class 문법과 유사)

```javascript
class Counter{
    value : number;
    constructor(){};
    setValue(){};
    getValue(){};
}
```

```
// 라이센스 버전
// SPDX-License-Identifier:MIT

// 솔리디티 버전
pragma solidity ^0.8.0

// 컨트랙트 코드
contract Counter{
    uint256 value;

    constructor(){};

    function setValue(uint256 _value) public {
        value = _value;
    }

    fuction getValue() public view returns (uint256){
        // 상태 변수 변경 없이 조회하기 위해 view를 사용
        return value;
    }
}
```

- javascript의 클래스에서 인스턴스를 생성하는 과정은 new 키워드를 사용해서 생성
- 이렇게 생성된 인스턴스들은 서로 다른 메모리 주소를 참조하기 때문에 동일한 객체가 아니다.

- solidity의 컨트랙트에서는 컴파일된 코드의 내용이 EVM을 통해 실행되고 CA가 생성될 때 solidity 코드의 내용으로 인스턴스가 한 번 생성된다. 이 후 생성된 인스턴스를 CA로 참조해 컨트랙트에 접근해서 사용하는 데이터는 같은 데이터를 참조하게 된다. (싱글톤 패턴의 방식)

- 싱글톤 패턴 방식 : 인스턴트 객체를 하나 생성해서 어디서든 생성한 인스턴스만 참조하는 디자인 패턴

- 스마트 컨트랙트 프로세스
1. 컨트랙트 코드 작성
2. 컨트랙트 코드 컴파일
3. 스마트 컨트랙트 배포(트랜잭션 생성)
4. node에 전송
5. 블록 생성 (트랜잭션 처리)
6. account 생성 (CA)
7. EVM에서 솔리디티 코드 실행, 인스턴스 생성
8. storage에 데이터 저장

# 스마트 컨트랙트 코드 구현

- 스마트 컨트랙트의 코드가 실행될 때 EVM에서 연산을 얼마나 할지와 네트워크 환경 기준으로 가스가 측정된다.
- 네트워크 상황과 코드의 복잡성에 따라 연산 (가스비 추정 정도만 가능)
- 상태 변수 값을 조회하는 함수는 연산을 하는 과정이 없기 때문에 가스비를 필요로 하지 않는다.
- 상태 변수 값을 변경하는 경우 연산이 포함 (한정된 네트워크 자원 사용), 연산에 따른 가스비 지불이 필요하다.
- 연산 과정에서 코드의 무한 루프를 연산하게 되면 과도한 가스비 발생을 방지하기 위해 gas limit을 초과할 경우 트랜잭션이 블록에 답기지 않는다.

# 개발 환경 구축

- solc 모듈 설치
```sh
# solc 설치
npm i solc@0.8.13

# ganache-cli 설치
npm i ganache-cli 

# 아래로 설치하면 전역 설치가 되어 파일마다 설치를 진행할 필요는 없다.
npm i -g ganache-cli 
```