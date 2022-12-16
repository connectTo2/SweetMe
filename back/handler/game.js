/* --------------------------------- require -------------------------------- */
const { getUserData } = require('./common');

/* --------------------------------- handler -------------------------------- */
const getAllWords = (req, res) => {
  const { voca } = getUserData(req, res);
  let allVocaWords = [];

  voca.forEach(({ words }) => {
    allVocaWords = [...allVocaWords, ...words];
  });

  res.send(allVocaWords);
};

module.exports = { getAllWords };
