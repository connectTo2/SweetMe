const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();

// 기본 설정
app.use(express.json());
app.use(cookieParser()); // 쿠키를 사용해서 jsonwebtoken 사용

// TODO:
// 사용자가 ID/Password를 제공하고 로그인 요청을 던지면
// 서버는 사용자 정보를 검증하고 암호화된 토큰을 생성 ( Access Token / Refresh Token)
// 사용자에게 토큰을 보내고 사용자는 토큰을 저장.
// 이후 요청부터는 사용자가 HTTP 헤더에 토큰을 담아 보냄. 속성 === authorization
// app.post('/signin');
// app.get('/accesstoken');
// app.get('/refreshtoken');
// app.get('/signin/success');
// app.post('/logout');

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
