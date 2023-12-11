import Block from "@core/block/block";
import Chain from "@core/chain/chain";
import {WebSocket, WebSocketServer} from "ws";

// ws : 기본적인 연결 관련 모듈

// enum : 상태 지정할 때 사용
enum MessageType {
    // 알기 쉽게 사용
    lastBlock = 0,
    allBlock = 1,
    addBlock = 2
}

interface IMessage {
    type : MessageType
    payload : any
}

class P2P extends Chain{
    // Chain 상속 받아서 메소드 사용
    private sockets : Array<any> // 연결된 소켓들 확인

    constructor(){
        super();
        this.sockets = [];
    }

    getSockets() : Array<WebSocket> {
        return this.sockets;
    }

    connectSocket(socket : any, type? : MessageType) : void {
        // 소켓 연결 시
        // 하나의 포트가 동적으로 생기고 그 포트에서 소켓을 들고 있음
        // socket에는 고유의 포트가 들어있는 상태. 충돌방지를 위해 어플리케이션 또는 서비스 연결을 하면 동적으로 포트 지정(고유 포트)
        this.sockets.push(
            `${socket._socket.remoteAddress} : ${socket._socket.remotePort}`
        );
        // socket.send() 메소드를 호출하면 이벤트 실행
        // "message" 이벤트 실행
        socket.on("message",(_data : string)=>{
            const data = JSON.parse(_data.toString());
            switch (data.type) {
                case MessageType.lastBlock:
                    const message : IMessage ={
                        type : MessageType.lastBlock,
                        payload : [this.latestBlock()]
                    }
                    // 완성된 객체를 문자열로 치환하여 보낸다.
                    socket.send(JSON.stringify(message));
                    break;
                case MessageType.allBlock:
                    
                    break;
                case MessageType.addBlock:
                    // 검증 로직 추가 예정
                    const isValid = this.replaceChain(data.payload);
                    if(isValid.isError) break;

                    const message2 : IMessage= {
                        type : MessageType.addBlock,
                        payload : data.payload
                    }

                    this.sockets.forEach((item)=>{
                        // 현재 접속한 유저들에게 메세지 전송
                        item.send(JSON.stringify(message2));
                    })
                    break;
            
                default:
                    break;
            }
        })
    }

    listen(port : number) : void {
        // 현재 로컬에서 서버 생성
        const server : WebSocketServer = new WebSocket.Server({port});

        server.on("connection",(socket : WebSocket)=>{
            // 소켓 연결 시도
            console.log('new socket start');
            // 연결한 소켓을 배열에도 추가, message 이벤트도 등록
            this.connectSocket(socket);
        })
    }

    addToPeer(peer : string) : void{
        // 상대방이 내 ip에 접속했을 때 소켓을 생성하고 연결
        const socket : WebSocket = new WebSocket(peer);
        // 상대 소켓 서버 주소를 받아 연결 시도
        socket.on('open',()=>{
            // 연결이 성공하면 'open' 이벤트 실행
            console.log('연결 성공');
            this.connectSocket(socket,MessageType.addBlock);
        })
    }
}

export default P2P;
// ip 주소 연결해서 data 받을 예정