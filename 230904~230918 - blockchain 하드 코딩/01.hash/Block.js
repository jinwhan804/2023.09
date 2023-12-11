const { SHA256 } = require('crypto-js');
const merkle = require('merkle');

// 블록 헤더 클래스
// 블록 헤더 내용 : 버전, 높이, 생성 시간, 이전 해시값, 해시값 등
class Header {  
    constructor(_height,_previousHash){
        // 블록의 버전
        this.version = Header.getVersion();
        // 블록의 높이
        this.height = _height;
        // 블록의 생성 시간
        this.timestamp = Header.getTimestamp();
        // 이전 블록의 해시 값 : 최초 블록은 이전 블록이 없기 때문에 0 처리
        this.previousHash = _previousHash || '0'.repeat(64);
    }

    // static으로 메서드 선언하면 전역으로 사용 가능
    // 해당 클래스로 객체를 생성했을 때(동적 할당 했을 때) 해당 객체에 이 메서드가 생성되지 않는다.
    static getVersion(){
        return '1.0.0';
    }

    static getTimestamp(){
        return new Date().getTime();
    }
}

// 블록 class
class Block{
    // block _header, _data 헤더 객체와 내용을 받아서 생성
    constructor(_header, _data){
        this.version = _header.version;
        this.height = _header.height;
        this.timestamp = _header.timestamp;
        this.previousHash = _header.previousHash;
        this.data = _data;
        this.merkleRoot = Block.getMerkleRoot(_data);
        // 블록의 해시
        this.hash = Block.createBlockHash(_header,Block.getMerkleRoot(_data));
    }

    static getMerkleRoot(_data){
        const merkleTree = merkle('sha256').sync(_data);
        return merkleTree.root();
    }

    static createBlockHash(_header,_merkleRoot){
        // 값을 모두 배열로 가져온다.
        const values = Object.values(_header);
        // join으로 배열을 문자열로 합친다.
        const data = values.join('') + _merkleRoot;
        return SHA256(data).toString();
    }
}

// 블록 생성
// 블록에 담을 데이터 더미 생성
const data = ['The Times 03/Jan/2009 Chancellor on brink of second bailout for banks'];

// 블록 헤더 객체 생성
// 첫 번째 블록은 높이를 0으로 주고 객체 생성
const header = new Header(0);
const block = new Block(header,data);

console.log(block);

const header2 = new Header(1, block.hash);
const block2 = new Block(header2,['두 번째 블록 데이터']);

console.log(block2);
