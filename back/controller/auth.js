// 실제 jwt를 가져와 어떻게 사용하는지 작성
const jwt = require('jsonwebtoken');
const userDatabase = require('../user');

// 사용자가 로그인 페이지에서 이메일과 패스워드를 입력해 signIn에 post요청을 하면 서버에서는 사용자에게 받은 정보를 가지고 AccessToken을 발급.
const signIn = (req, res, next) => {
  const { email, password } = req.body;

  // 전달받은 email/password로 데이터 베이스를 필터링해서 유저가 데이터베이스에 있는지 확인
  const userInfo = userDatabase.filter(user => user.email === email && user.password === password)[0];

  // 유저가 데이터베이스에 없으면 에러 처리
  if (!userInfo) {
    res.status(403).json('Not Authorized!');
  }
  // 유저가 있으면 유저 정보를 토대로 AccessToken과 Refreshtoken 발급
  else {
    try {
      // AccessToken 발급
      // 3가지 인수: (sign함수에 담을 유저정보, dotenv파일에서 지정해준 secret값, 해당 토큰의 유효기간과 발행자에 대한 정보 등을 담은 객체)
      const accessToken = jwt.sign(
        { id: userInfo.id, name: userInfo.name, email: userInfo.email, password: userInfo.password },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '10m',
          issuer: 'Sweet Me',
        }
      );

      // Refreshtoken 발급
      const refreshToken = jwt.sign(
        { id: userInfo.id, name: userInfo.name, email: userInfo.email, password: userInfo.password },
        process.env.REFRESH_SECRET,
        {
          expiresIn: '24h',
          issuer: 'Sweet Me',
        }
      );

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
      res.status(500).json('Signin Failed');
    }
  }

  // 다음 미들웨어 실행을 위해 next 실행
  next();
};

// TODO: signIn 성공으로 토큰 정상 발급시 signInSuccess로 요청을 받음
// const signInSuccess = (req, res) => {};

module.exports = {
  signIn,
  // signInSuccess,
};
