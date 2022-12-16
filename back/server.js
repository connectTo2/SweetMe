const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { signIn } = require('./controller/auth');

const app = express();
dotenv.config();

app.use(express.static('public'));

// <클라이언트에서 서버로 요청이 가능하도록 하는 기본 설정>
// client와 server간의 통신을 위해 JSON 형식을 다룰거기 때문에 JSON 미들웨어 설치
app.use(express.json());
// 쿠키를 사용해 jwt를 사용할 것이기 때문에 cookie-parser 설정
app.use(cookieParser());

app.use(cors({ origin: '*', methods: ['GET', 'POST'], credentials: true }));

app.post('/signIn', signIn);
// signin이 성공했을 때 사용자가 요청을 하면 현재 쿠키에 담겨있는 AccessToken을 가지고 사용자 정보를 parsing하여 전달해주는 역할
// app.get('/signIn/success', signInSuccess);
// logout을 하면 현재 쿠키에 담겨져 있는 AccessToken을 제거하는 역할

app.get('/', (req, res) => {
  res.send([1, 2, 3, 4]);
});

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
