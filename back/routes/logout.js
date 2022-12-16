const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  try {
    req.cookie('accessToken', '');
    req.cookie('refreshToken', '');

    res.status(200).json('Logout Success!');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
