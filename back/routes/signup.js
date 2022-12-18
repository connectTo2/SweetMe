const express = require('express');
const usersInfo = require('../user');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

const generateNextId = () => Math.max(0, ...usersInfo.map(({ userId }) => +userId)) + 1;

router.post('/', (req, res) => {
  const { email, userName, password } = req.body;

  const userInfo = usersInfo.find(user => user.email === email);

  // userInfo가 있으면 이미 가입된 회원이라는 에러를 띄워줌
  if (userInfo) {
    res.status(409).json('Signup comflict!');
  } else {
    usersInfo.push({
      userId: generateNextId(),
      email,
      name: userName,
      password,
      voca: [],
      wordsCount: 0,
    });
    res.status(201).json('Signup success!');
    console.log('[newUser]', usersInfo.at(-1));
  }
});

module.exports = router;
