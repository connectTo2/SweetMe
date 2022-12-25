const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { findUserInfo, getAllInfo } = require('./user');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

/* ---------------------------------- auth ---------------------------------- */

const auth = (req, res, next) => {
  const { accessToken } = req.cookies;

  try {
    /**
     * jwt.verity는 첫번째 인수, 즉 전달된 토큰을 암호화된 키값으로 유효성 검사를 진행하고, 유효한 경우 디코딩된 페이로드를 반환한다.
     * 유효하지 않을 경우 에러를 발생시킨다.
     */
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    console.log('[사용자 인증 성공]', decoded);
    next();
  } catch (e) {
    console.error('[사용자 인증 실패]', e);
    return res.redirect('/signin');
  }
};

/* -------------------------------- function -------------------------------- */

const getUserInfo = (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const { email, password } = jwt.verify(accessToken, process.env.ACCESS_SECRET);

    return findUserInfo(email, password);
  } catch (error) {
    res.status(404).json('NOT FOUND');
  }
};

const generateNextId = usersInfo => Math.max(0, ...usersInfo.map(({ userId }) => +userId)) + 1;

/* --------------------------------- 주소창 접근 --------------------------------- */

['/', '/wordlist', '/wordlist:id'].forEach(url => {
  app.get(url, auth, (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
});

/* -------------------------------- 정적 파일 제공 -------------------------------- */

app.use(express.static('dist'));

/* ---------------------------------- 로그인 route --------------------------------- */

// POST /api/signin
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  // 전달받은 email/password로 데이터 베이스를 필터링해서 유저가 데이터베이스에 있는지 확인
  const userInfo = findUserInfo(email, password);

  if (!userInfo) {
    res.status(403).json('Not Authorized!');
  } else {
    const { id, name, email, password } = userInfo;

    try {
      // AccessToken 발급
      // 3가지 인수: (sign함수에 담을 유저정보, dotenv파일에서 지정해준 secret값, 해당 토큰의 유효기간과 발행자에 대한 정보 등을 담은 객체)
      const accessToken = jwt.sign({ id, name, email, password }, process.env.ACCESS_SECRET, {
        expiresIn: '1d',
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

      // 토큰을 완성하여 정상 발급했을 때 response 객체에 로그인을 성공했다는 메시지 전달
      res.status(200).json('Signin Success!');
    } catch {
      // error가 난 경우 에러 처리
      /**
       * 토큰 발행이 정상적으로 이루어지지 못했을 경우 status 401을 반환
       * <클라이언트 모든 라우터 공통 사항>
       * 서버로 요청하여 받은 response 객체의 status가 401일 경우 해당 라우터의 rendering을 중지하고 signIn page를 rendering
       */
      res.status(401).json('Signin Failed');
    }
  }
});

/* ---------------------------------- 회원가입 route --------------------------------- */

// POST /api/signup
app.post('/api/signup', (req, res) => {
  const { email, userName, password } = req.body;

  const usersInfo = getAllInfo();
  const duplication = usersInfo.find(userInfo => userInfo.email === email || userInfo.name === userName);

  if (duplication) {
    res.status(409).json('Signup comflict!');
  } else {
    usersInfo.push({
      userId: generateNextId(usersInfo),
      email,
      name: userName,
      password,
      voca: [],
      wordsCount: 0,
    });
    res.status(201).json('Signup success!');
  }
});

/* ---------------------------------- 로그아웃 ---------------------------------- */

app.get('/api/signout', (req, res) => {
  res.clearCookie('accessToken');
  res.send('logout');
});

/* ---------------------------------- 단어장 목록 route --------------------------------- */

// GET /api
app.get('/api', (req, res) => {
  const userInfo = getUserInfo(req, res);
  const { name, voca } = userInfo;
  res.send({ name, voca });
});

// POST /api
app.post('/api', (req, res) => {
  const newVocaItem = req.body;
  const userInfo = getUserInfo(req, res);

  userInfo.voca.push(newVocaItem);
  res.send(userInfo);
});

// DELETE /api/:id
app.delete('/api/:id', (req, res) => {
  const { id } = req.params;
  const data = getUserInfo(req, res);

  data.voca = data.voca.filter(item => item.vocaId !== id);
  res.send(data);
});

/* ---------------------------------- 단어장 페이지 route --------------------------------- */

// GET /api/wordlist/:vocaId
app.get('/api/wordlist/:vocaId', (req, res) => {
  const { vocaId } = req.params;
  const userInfo = getUserInfo(req, res);

  const vocaItem = userInfo.voca.find(vocaItem => vocaItem.vocaId === vocaId);
  res.send(vocaItem);
});

// POST /api/wordlist/:vocaId
app.post('/api/wordlist/:vocaId', (req, res) => {
  const { vocaId } = req.params;
  const newWord = req.body;
  const userInfo = getUserInfo(req, res);
  const vocaItem = userInfo.voca.find(vocaItem => vocaItem.vocaId === vocaId);

  vocaItem.words.push(newWord);
  res.send(vocaItem);
});

// PATCH /api/wordlist/:vocaId
app.patch('/api/wordlist/:vocaId', (req, res) => {
  const { vocaId } = req.params;
  const { name, value, wordId } = req.body;
  const userInfo = getUserInfo(req, res);
  const vocaItem = userInfo.voca.find(vocaItem => vocaItem.vocaId === vocaId);

  // wordId가 있다면 vocaItem에서 title, description이 아닌 word에 대한 변경이다.
  if (wordId) {
    vocaItem.words = vocaItem.words.map(word => (word.wordId === wordId ? { ...word, [name]: value } : word));
  } else {
    vocaItem[name] = value;
  }

  res.send(vocaItem);
});

// DELEATE /api/wordlist/:vocaId
app.delete('/api/wordlist/:vocaId', (req, res) => {
  const { vocaId } = req.params;
  const { wordId } = req.query;

  const userInfo = getUserInfo(req, res);
  const vocaItem = userInfo.voca.find(vocaItem => vocaItem.vocaId === vocaId);
  vocaItem.words = vocaItem.words.filter(word => word.wordId !== wordId);

  res.send(vocaItem);
});

/* ----------------------------- 지정되지 않은 페이지 접근 ----------------------------- */

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

/* --------------------------------- listen --------------------------------- */

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
