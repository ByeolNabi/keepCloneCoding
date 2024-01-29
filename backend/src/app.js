const{ Note } = require("./model"); // model 경로에 있는 index.js에 모듈을 매핑해두면 편하게 import할 수 있다. 

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mothodOverride = require("method-override");

const app = express();

app.use(cors());
// get, post를 이용해서 put, delete를 사용하게 하는 미들웨어.  form은 get post만 지원함
app.use(methodOverride());

app.use(express.json());
// http요청이 서버로 들어올때마다 로그를 출력해줌
app.use(morgan("dev"));

// 미들웨어...?
app.use((req, res, next) => {
  // next함수는 다음 미들웨어로 순서를 넘깁니다.
  const error = new Error("존재하지 않는 API 경로입니다.");
  error.status = 404;
  next(error); // 에러와 함께 다음 미들웨어로 넘긴다.
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json({
      msg: error.message,
    });
    return;
  }

  res.status(500).json({
    msg: "서버 내부에서 문제가 발생하였습니다.",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API 서버가 ${PORT}에서 요청을 기다리고 있습니다.`);
});
