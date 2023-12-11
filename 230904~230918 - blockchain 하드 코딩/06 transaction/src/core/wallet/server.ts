// 지갑 서버

import express from "express";
import { Wallet } from "./index";
import path from "path";
// import axios from "axios";
import fs from "fs";

const app = express();

// -------------------------------------
// npm i axios
// npm install @types/axios
// -------------------------------------

// const baseURL = "http://localhost:3000";
// const request = axios.create({
//   baseURL,
// });

app.use(express.json());

app.get("/", (req, res) => {
  const page = fs.readFileSync(
    path.join(__dirname, "/view/index.html"),
    "utf8"
  );
  res.send(page);
});

app.post("/newWallet", (req, res) => {
  res.json(new Wallet());
});

app.post("/walletList", (req, res) => {
  const list = Wallet.getWalletList();
  res.json(list);
});

app.get("/wallet/:account", (req, res) => {
  const { account } = req.params;
  const privateKey = Wallet.getWalletPrivateKey(account);
  res.json(new Wallet(privateKey));
});

// app.post("/sendTransaction", async (req, res) => {
//   console.log(req.body);
//   const {
//     sender: { publicKey, account },
//     received,
//     amount,
//   } = req.body;
//   // 서명 만들기
//   // 필요한 값은 SHA256(보낸사람 : 공개키 + 받는 사람 : 계정 + 보낼 금액)
//   const signature = Wallet.createSign(req.body);

//   // 보낼사람 : 공개키
//   // 받는사람 : 계정, 서명
//   const txObject = {
//     sender: publicKey,
//     received,
//     amount,
//     signature,
//   };

//   // 블록체인 인터페이스 관리 HTTP 서버에 요청
//   const response = await request.post("/sendTransaction", txObject);
//   console.log("dsfsdfsdfsd", response.data);
//   res.json({});
// });

app.listen(5000, () => {
  console.log("server on~");
});
