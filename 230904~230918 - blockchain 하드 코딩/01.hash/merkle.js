const merkle = require('merkle');

// merkle tree : 데이터의 암호화 구조가 트리 형태를 띄고 있다.
// 데이터의 무결성 검증에 사용되는 트리 구조
// 블록의 필수 요소이고 데이터들을 해시화 한 후 더해주고 다시 해시화를 해주는 작업을 반복
// 트리처럼 뻗어서 마지막 루트 해시값을 구해서 사용한다.
// 데이터의 갯수가 홀수라면 마지막 데이터를 복사해서 해시 작업을 추가한다. 즉, 자동적으로 짝수로 맞추어 작업을 진행한다.

const data = ['a','b','c','d','e'];

const merkleTree = merkle('sha256').sync(data);
const Root = merkleTree.root();
console.log(Root);