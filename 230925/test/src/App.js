import { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';

function App() {
  // 브라우저에서 이더리움 블록체인 상호작용
  // 메타 마스크 확장 프로그램을 통해 네트워크에 상호작용 할 수 있다.
  // 트랜잭션 발생 시 서명 정보 필요. 개인키를 직접 전달하는게 아니라 메타마스크에 안전하게 저장한다.

  // 원격 프로시저 호출을 통해 컨트랙트 함수를 실행시킬 수 있고 네트워크 메서드 사용을 통해 계정 정보등의 로직 사용 가능

  // 데이터베이스를 가지고 로그인 구현하면 아이디 비번 입력해서 중앙화 데이터 베이스에 값이 저장되고
  // 사용자가 로그인 했을 때 프로세스를 지갑 로그인으로 가져간다. (탈중앙화 어플리케이션 로그인 처리 방식)
  {/* 지갑 내용을 가지고 계정 조회 */}
  const [account,setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(()=>{
    (async()=>{
      const [data] = await window.ethereum.request({
        method : "eth_requestAccounts",
      })
      console.log(data);
      // 현재 연결한 지갑 주소 : 0xd870026bcef7a0b52f5dd27f23d4dec82693cc86
      // 네트워크 web3 연결
      setWeb3(new Web3(window.ethereum));
      setAccount(data);
    })();
  },[]);

  const balanceBtn = async()=>{
    const balance = await web3.eth.getBalance(account);
    const _balance = await web3.utils.fromWei(balance,"ether");
    setBalance(_balance);
  }
  
  return (
    <div className="App">
      {account || "로그인 필요"}<br/>
      {balance}ETH <br/>
      <button onClick={balanceBtn}>잔액 조회</button>
    </div>
  );
}

export default App;
