import {TransactionData, TransactionPool, TransactionRow, TxIn, TxOut, UnspentTxOut} from "./transaction.interface";
import {SignatureInput} from 'elliptic';
import { SHA256 } from "crypto-js";

class Sender {
    account : string; // 보낼 사람의 계정 주소
}

class Receipt {
    sender : Sender;
    received : string; // 받는 사람의 계정
    amount : number; // 보낸 금액
    signature : SignatureInput; // 서명 정보
}

class Transaction {
    // 블록 채굴을 하면 블록 생성 권한을 얻고 트랜잭션 처리를 진행
    // 첫 번째 트랜잭션으로 특수한 트랜잭션이 추가된다.
    // 채굴한 사람의 주소와 전달되는 금액 보상이 들어간다.
    private readonly REWARD = 50; // 코인 베이스 트랜젝션 보상
    private readonly transactionPool : TransactionPool = []; // 트랜잭션이 처리되지 않은 내용이 있는 공간

    constructor(){}

    // 트랜잭션 목록을 확인, 조회하는 함수
    getPool(){
        return this.transactionPool;
    }

    // 트랜잭션 추가
    create(receipt : Receipt, unspentTxOuts : UnspentTxOut[]){
        // 트랜잭션의 output 내용의 객체를 UTXO에 추가
        // 서명 확인
        if(!receipt.signature) throw new Error('서명이 정상적이지 않다.');

        // 잔액 계산
        const [txIns, amount] = this.createInput(
            unspentTxOuts,
            receipt.amount,
            receipt.signature
        )

        // 트랜잭션 객체 생성
        const txOuts = this.createOutput(
            receipt.received,
            receipt.amount,
            receipt.sender.account,
            amount
        )

        // 트랜잭션 객체 생성
        const transaction : TransactionRow = {
            txIns, // 누가 누구에게 전송한 금액의 내용 및 잔액 확인
            txOuts // 최종적인 결과물. 누구의 주소에 얼마가 포함되는지 객체 생성
        }

        // 트랜잭션 객체에 hash 값 추가
        transaction.hash = this.serializeRow(transaction);

        this.transactionPool.push(transaction);
        // 바로 트랜잭션이 처리되는게 아니라 pool에 우선 담김.
        // 이 후 대기 상태로 있다가 블록이 채굴되면 검증하고 승인이 된 후 트랜잭션 처리.
        // 하나의 블록에 여러 개의 트랜잭션 내용을 기록한다.

        return transaction;
    }

    createInput(myUnspentTxOuts : UnspentTxOut[], receiptAmount : number, signature : SignatureInput) : [TxIn[], number]{
        let targetAmount = 0;

        const txins = myUnspentTxOuts.reduce((acc : TxIn[], unspentTxOut : UnspentTxOut)=>{
            // 현재 순회하는 요소(본인의 미사용 객체 UTXO)의 내용에서 잔액과 포함된 트랜잭션 hash 값, index를 구조분해 할당
            const {amount, txOutId, txOutIndex} = unspentTxOut;

            // 검증
            if(targetAmount >= receiptAmount) return acc;

            targetAmount += amount;
            acc.push({txOutIndex, txOutId, signature});
            return acc;
        }, [] as TxIn[]
        // type 추론이 안 될 경우 타입을 알려주는 문구
        )
        return [txins, targetAmount];
    }

    createOutput(       
        received : string,
        amount : number,
        sender : string,
        sendAmount : number
    ){
        // amount 받은 사람의 금액(얼마 받았는지)
        // sendAmount 보낸 사람의 잔액
        console.log(received, amount, sender, sendAmount);
        const txouts : TxOut[] = [];
        txouts.push({account : received, amount});
        
        // 보낸 사람의 잔액을 새로운 객체로 만들어서 목록에 추가
        if(sendAmount - amount > 0){
            txouts.push({account : sender, amount : sendAmount - amount});
        }

        // 잔액 비교 검증
        const outAmount = txouts.reduce((acc, txout : TxOut)=> acc + txout.amount,0)

        console.log(outAmount, sendAmount);

        // 전체 금액 검증.
        // 내가 가지고 있는 금액에서 보낸 값과 계산 후 남은 잔액이 총 금액과 맞는지 검증
        if(outAmount !== sendAmount) throw new Error('금액이 맞지 않음');
        return txouts;
    }

    serializeTxOut(txOut : TxOut) : string{
        // 출력 트랜잭션을 문자열로 반환
        const {account, amount} = txOut;
        const text = [account, amount].join('');
        return SHA256(text).toString();
    }

    serializeTxIn(txIn : TxIn) : string{
        // 입력 트랜잭션을 문자열로 반환
        const {txOutIndex} = txIn;
        const text = [txOutIndex].join('');
        return SHA256(text).toString();
    }

    // 트랜잭션을 직렬화한 문자열로 반환
    serializeTx<T>(data : T[], callback : (item : T) => string){
        // 데이터를 배열로 문자열 반환
        // acc 초기 값 "", 배열 수만큼 반복시키면서 callback 함수 반환 값에 문자열을 계속 더해서 긴 문자열로 반환
        return data.reduce((acc : string, item : T) => acc + callback(item), "");
    }

    // 트랜잭션 row를 전부 직렬화해서 반환할 함수
    serializeRow(row : TransactionRow) {
        const {txIns, txOuts} = row;
        const txOutsText = this.serializeTx<TxOut>(txOuts,(item) => 
            this.serializeTxOut(item)
        )

        const txInsText = this.serializeTx<TxIn>(txIns, (item)=>
        
            this.serializeTxIn(item)
        )

        return SHA256(txOutsText + txInsText).toString();
    }

    // 블록 채굴 시 채굴자가 채굴 보상을 받음
    // 이 때 특수한 트랜잭션이 발생, 블록에 첫 번째로 기록된다.
    createCoinbase(account : string, latestBlockHeight : number){
        const txin = this.createTxIn(latestBlockHeight + 1);
        const txout = this.createTxOut(account, this.REWARD);
        return this.createRow([txin],[txout]);
    }

    createRow(txIns : TxIn[], txOuts : TxOut[]){
        const transactionRow = new TransactionRow();
        transactionRow.txIns = txIns;
        transactionRow.txOuts = txOuts;
        transactionRow.hash = this.serializeRow(transactionRow);
        return transactionRow;
    }

    createTxIn(txOutIndex : number, txOutId ?: string, signature ?: SignatureInput) : TxIn {
        const txIn = new TxIn();
        txIn.txOutIndex = txOutIndex;
        txIn.txOutId = txOutId;
        txIn.signature = signature;
        return txIn;
    }

    createTxOut(account : string, amount : number) : TxOut{
        if(account.length !== 40) throw new Error('계정 주소가 정상적이지 않음');
        const txout = new TxOut();
        txout.account = account;
        txout.amount = amount;
        return txout;
    }

    // 트랜잭션 pool 업데이트
    update(transaction : TransactionRow){
        const findCallBack = (tx : TransactionRow) => transaction.hash == tx.hash;
        const index = this.transactionPool.findIndex(findCallBack);
        if(index !== -1) this.transactionPool.splice(index,1);
    }

    // 트랜잭션 목록 업데이트
    sync(transactions : TransactionData){
        if(typeof transactions === 'string') return;

        transactions.forEach(this.update.bind(this));
    }
}

export default Transaction;