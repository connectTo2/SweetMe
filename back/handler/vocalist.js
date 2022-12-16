/* --------------------------------- require -------------------------------- */
const { getUserData } = require('./common');

/* --------------------------------- handler -------------------------------- */
const getVoca = (req, res) => {
  const { name, voca, wordsCount } = getUserData(req, res);
  const infoToSend = { name, voca, wordsCount };

  res.send(infoToSend);
};

const addVoca = () => {};

const removeVoca = () => {};

module.exports = {
  getVoca,
  addVoca,
  removeVoca,
};
