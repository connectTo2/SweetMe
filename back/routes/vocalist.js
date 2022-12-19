const express = require('express');
const { getUserInfo } = require('../auth');
// const usersInfo = require('../user');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  /* ------------------- console.log(getUserInfo(req, res)); ------------------ */
  // {
  //   userId: 0,
  //   email: 'dumdum1@naver.com',
  //   name: '코카콜라맛있다',
  //   password: '111111',
  //   voca: [
  //     {
  //       vocaId: '1670999143000',
  //       title: '토익 영단어 모음',
  //       vocaDescription: '12월 토익 800점을 위한 단어 모음집!',
  //       words: [Array]
  //     },
  //     {
  //       vocaId: '1670999351000',
  //       title: '경선식 영어 암기!',
  //       vocaDescription: '가볍게 자주 읽을 수 있는 단어들 모음',
  //       words: [Array]
  //     }
  //   ]
  // }

  /* ------------------------------- destructure ------------------------------ */
  /**
   * vocalist 페이지로 접근했을 때 전달해주어야하는것:
   * @name : String
   * @voca : Array
   */
  // const { name, voca } = getUserInfo(req, res);
  const { name, voca } = getUserInfo(req, res);
  res.send({ name, voca });
});

router.post('/', () => {});

// DELETE /:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const data = getUserInfo(req, res);
  const { voca } = data;
  const filteredVoca = voca.filter(item => item.vocaId !== id);

  data.voca = filteredVoca;
  res.send(data);
});

module.exports = router;
