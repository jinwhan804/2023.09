// SPDX-License-Identifier : MIT

pragma solidity ^0.8.0;

contract Counter{
    uint256 value;

    constructor(){}

    // setter
    function setValue(uint256 _value) public {
        // value 상태가 변경된다.
        // 수수료 발생(gas비 발생)
        value = _value;
    }

    // getter
    function getValue() public view returns(uint256) {
        // view : 조회하기 위한 코드 작성 시 
        // returns(uint256) 함수의 반환 타입 설정
        return value;
    }
}