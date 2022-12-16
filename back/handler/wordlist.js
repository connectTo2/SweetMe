/* --------------------------------- require -------------------------------- */
const { getUserData } = require('./common');

/* --------------------------------- handler -------------------------------- */
const getWords = (req, res) => {
  const { voca } = getUserData(req, res);

  res.send(voca);
};

const addWord = () => {};

const editWord = () => {};

const removeWord = () => {};

module.exports = {
  getWords,
  addWord,
  editWord,
  removeWord,
};
