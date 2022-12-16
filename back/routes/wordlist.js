const express = require('express');
const { getUserData } = require('../auth');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  const { voca } = getUserData(req, res);

  res.send(voca);
});

router.post('/', () => {});

router.patch('/:id', () => {});

router.delete('/:id', () => {});

module.exports = router;
