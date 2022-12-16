/* --------------------------------- require -------------------------------- */
const jwt = require('jsonwebtoken');
const userDatabase = require('../user');

/* --------------------------------- handler -------------------------------- */
// 로그인 검증이 필요한 페이지에서 서버로 요청이 들어올 때 유저의 브라우저에서 토큰을 확인하고 해당 토큰이 유효하면 유저 정보를 반환하는 함수.
const getUserData = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.find(user => user.email === data.email && user.password === data.password);

    return userData;
  } catch {
    // 토큰이 유효하지 않다면 유저 정보를 반환하는 대신 500 에러를 띄운다.
    // NOTE: 클라이언트에서 서버에 요청했을 때 500 에러를 전달받는다면(res.status===500) 동작을 중지시키고 Signin 페이지로 강제로 이동시킨다.
    res.status(500).json('NOT VALID TOKEN!');
  }
};

module.exports = { getUserData };
