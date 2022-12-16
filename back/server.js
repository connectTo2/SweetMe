/* --------------------------------- require -------------------------------- */
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { signIn } = require('./handler/signin');
const { logOut } = require('./handler/logout');
const { addUser } = require('./handler/signup');
const { getAllWords } = require('./handler/game');
const { getVoca, addVoca, removeVoca } = require('./handler/vocalist');
const { getWords, addWord, editWord, removeWord } = require('./handler/wordlist');

/* ------------------------------------ use middleware ----------------------------------- */
const app = express();
// <클라이언트에서 서버로 요청이 가능하도록 하는 기본 설정>
// client와 server간의 통신을 위해 JSON 형식을 다룰거기 때문에 JSON 미들웨어 설치
app.use(express.json());
// 쿠키를 사용해 jwt를 사용할 것이기 때문에 cookie-parser 설정
app.use(cookieParser());
// 클라이언트 서버 간 cors 오류 방지 (개발 단에서 임시로 origin:* 설정)
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE'], credentials: true }));

dotenv.config();

/* -------------------------------- route -------------------------------- */
// 로그인 JWT 토큰 발행
app.route('/signin').post(signIn);

// 로그아웃 JWT 토큰 삭제
app.route('/logout').get(logOut);

// 회원가입 서버에 유저 정보 추가
app.route('/signup').post(addUser);

// vocalist route
app.route('/vocalist').get(getVoca).post(addVoca).delete(removeVoca);

// wordlist route
app.route('/wordlist').get(getWords).post(addWord).patch(editWord).delete(removeWord);

// game route
app.route('/game').get(getAllWords);

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
