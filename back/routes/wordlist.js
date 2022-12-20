const express = require('express');
const { getUserInfo } = require('../auth');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/:id', (req, res) => {
  console.log('[params]', req.params);
  const { vocaId } = req.params;
  const { data: usersInfo } = getUserInfo(req, res);
  const vocaItemInfo = usersInfo.voca.filter(vocaItem => vocaItem.vocaId === vocaId);

  res.send(vocaItemInfo);
});

router.post('/', () => {});

router.patch('/:id', () => {});

router.delete('/:id', () => {});

module.exports = router;
