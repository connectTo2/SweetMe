/* --------------------------------- require -------------------------------- */
const jwt = require('jsonwebtoken');
const userDatabase = require('../user');

/* --------------------------------- handler -------------------------------- */
// 사용자가 로그인 페이지에서 이메일과 패스워드를 입력해 signIn에 post요청을 하면 서버에서는 사용자에게 받은 정보를 가지고 AccessToken을 발급.
const signIn = (req, res) => {
  const { email, password } = req.body;

  // 전달받은 email/password로 데이터 베이스를 필터링해서 유저가 데이터베이스에 있는지 확인
  const userInfo = userDatabase.find(user => user.email === email && user.password === password);

  // 유저가 데이터베이스에 없으면 에러 처리
  if (!userInfo) {
    res.status(403).json('Not Authorized!');
  }
  // 유저가 있으면 유저 정보를 토대로 AccessToken과 Refreshtoken 발급
  else {
    const { id, name, email, password } = userInfo;
    try {
      // AccessToken 발급
      // 3가지 인수: (sign함수에 담을 유저정보, dotenv파일에서 지정해준 secret값, 해당 토큰의 유효기간과 발행자에 대한 정보 등을 담은 객체)
      const accessToken = jwt.sign({ id, name, email, password }, process.env.ACCESS_SECRET, {
        expiresIn: '10m',
        issuer: 'Sweet Me',
      });

      // Refreshtoken 발급
      const refreshToken = jwt.sign({ id, name, email, password }, process.env.REFRESH_SECRET, {
        expiresIn: '24h',
        issuer: 'Sweet Me',
      });

      // 토큰값을 클라이언트에 전달을 해주면 클라이언트는 다음 요청부터 모든 요청에 발급받은 AccessToken과 RefreshToken을 담아 요청을 보내게 됨.
      // cookie에 담아서 전송
      res.cookie('accessToken', accessToken, {
        // https와 http의 차이를 명시. express서버는 http 프로토콜을 사용하기 때문에 false값 설정
        secure: false,
        // 자바스크립트에서 쿠키의 접근을 차단
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
      });

      // 토큰을 완성하여 정상 발급했을 때 response 객체에 로그인을 성공했다는 메시지 전달
      res.status(200).json('Signin Success!');
    } catch {
      // error가 난 경우 에러 처리
      /**
       * 토큰 발행이 정상적으로 이루어지지 못했을 경우 status 500을 반환
       * <클라이언트 모든 라우터 공통 사항>
       * 서버로 요청하여 받은 response 객체의 status가 500일 경우 해당 라우터의 rendering을 중지하고 signIn page를 rendering
       */
      res.status(500).json('Signin Failed');
    }
  }
};

// TODO: signIn 성공으로 토큰 정상 발급시 signInSuccess로 요청을 받음
// const signInSuccess = (req, res) => {};

module.exports = { signIn };
