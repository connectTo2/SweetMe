const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
// <클라이언트에서 서버로 요청이 가능하도록 하는 기본 설정>
// client와 server간의 통신을 위해 JSON 형식을 다룰거기 때문에 JSON 미들웨어 설치
app.use(express.json());
// 쿠키를 사용해 jwt를 사용할 것이기 때문에 cookie-parser 설정
app.use(cookieParser());
// 클라이언트 서버 간 cors 오류 방지 (개발 단에서 임시로 origin:* 설정)
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE'], credentials: true }));

dotenv.config();

/* -------------------------- require router module ------------------------- */
const signin = require('./routes/signin');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
const vocalist = require('./routes/vocalist');
const wordlist = require('./routes/wordlist');
const game = require('./routes/game');

/* ------------------------------- load Router module ------------------------------- */
// /routes -> 각 path의 라우터를 모듈로 생성.
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/vocalist', vocalist);
app.use('/wordlist', wordlist);
app.use('/game', game);

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
