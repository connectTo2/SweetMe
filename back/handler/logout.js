// /logout 으로 get요청이 오면 브라우저에 저장된 쿠키의 accessToken 값을 비워줌
const logOut = (req, res) => {
  try {
    req.cookie('accessToken', '');
    res.status(200).json('Logout Success!');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { logOut };
