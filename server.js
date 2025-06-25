// server.js

const express = require("express");
const cors = require("cors");

// 허용할 origin 검사 함수
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman 같은 non-browser 요청 허용

    try {
      const url = new URL(origin);
      if (url.hostname === "127.0.0.1") {
        return callback(null, true);
      }
    } catch (err) {
      return callback(new Error("Invalid origin"), false);
    }

    return callback(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true, // 쿠키 등 인증정보 허용 시 필요
};

const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors(corsOptions));

let data = { message: "여러분 화이팅!" };

app.options("/", (req, res) => {
  res.status(204);
});

app.get("/", (req, res) => {
  res.status(200).send(JSON.stringify(data));
});

app.post("/", (req, res) => {
  data.message = req.body;

  res.status(200).send(`받은 POST 데이터: ${req.body}`);
});

app.put("/", (req, res) => {
  data.message = req.body;

  res.status(200).send(`업데이트된 데이터: ${req.body}`);
});

app.delete("/", (req, res) => {
  data = {};

  res.status(200).send("데이터가 삭제되었습니다.");
});

app.listen(3000, () => {
  console.log("서버가 http://localhost:3000/ 에서 실행 중입니다.");
});
