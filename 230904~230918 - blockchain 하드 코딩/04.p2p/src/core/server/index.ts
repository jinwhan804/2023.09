import Block from "@core/block/block";
import P2P from "./p2p";
import express, {Express, Request, Response} from "express";
import os from 'os';
import cors from 'cors';

const app : Express = express();
const ws : P2P = new P2P();

app.use(cors({
    origin : 'http://127.0.0.1:5500'
}))
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.get("/chains",(req : Request,res : Response)=>{
    res.json(ws.get());
})

app.post('/block/mine',(req : Request, res : Response)=>{
    // 블록에 기록할 내용을 받는다.
    const {data} : {data : Array<string>} = req.body;
    const newBlock : Block | null = Block.generateBlock(ws.latestBlock(), data, ws.getAdjustmentBlock());
    if(newBlock === null) res.send('error');
    ws.addToChain(newBlock);

    res.json(newBlock);
})

app.get('/peer/add',(req : Request, res : Response)=>{
    const networkInterface = os.networkInterfaces();
    let v4 : string;
    for (const key in networkInterface) {
        const Array = networkInterface[key];
        for (const value of Array) {
            if(!value.internal && value.family === "IPv4")
            v4 = value.address;
        }
    }

    ws.addToPeer(`ws://${v4}:7545`);
    res.end();
})

app.get('/peer',(req : Request, res : Response)=>{
    const sockets = ws.getSockets();
    res.json(sockets);
})

app.listen(8080, ()=>{
    console.log('server open');
    ws.listen(7545);
})