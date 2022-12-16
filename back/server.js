/* --------------------------------- require -------------------------------- */
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {
  signIn,
  verifyEmail,
  addUser,
  logOut,
  getAllWords,
  getVoca,
  addVoca,
  removeVoca,
  getWords,
  addWord,
  editWord,
  removeWord,
} = require('./handler');

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
// signin page
app.post('/signin', signIn);

// signup page
app.get('/signup', verifyEmail);
app.post('/signup', addUser);

// vocalist page, wordlist page, game page
app.route('/logout').get(logOut);

// vocalist page
app.get('/vocalist', getVoca);
app.post('/vocalist', addVoca);
app.delete('/vocalist/:id', removeVoca);

// wordlist page
app.get('/wordlist', getWords);
app.post('/wordlist', addWord);
app.patch('/wordlist/:id', editWord);
app.delete('/wordlist/:id', removeWord);

// game page
app.get('/game', getAllWords);

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
