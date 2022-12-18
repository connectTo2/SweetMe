const express = require('express');
const { getUserInfo } = require('../auth');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  const { voca } = getUserInfo(req, res);
  let allVocaWords = [];

  voca.forEach(({ words }) => {
    allVocaWords = [...allVocaWords, ...words];
  });

  res.send(allVocaWords);
});

module.exports = router;
