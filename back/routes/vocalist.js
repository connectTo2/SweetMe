const express = require('express');
const { getUserData } = require('../auth');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  const { name, voca, wordsCount } = getUserData(req, res);
  const infoToSend = { name, voca, wordsCount };

  res.send(infoToSend);
});

router.post('/', () => {});

router.delete('/:id', () => {});

module.exports = router;
