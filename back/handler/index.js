const { signIn } = require('./signin');
const { logOut } = require('./logout');
const { verifyEmail, addUser } = require('./signup');
const { getAllWords } = require('./game');
const { getVoca, addVoca, removeVoca } = require('./vocalist');
const { getWords, addWord, editWord, removeWord } = require('./wordlist');

module.exports = {
  signIn,
  logOut,
  verifyEmail,
  addUser,
  getAllWords,
  getVoca,
  addVoca,
  removeVoca,
  getWords,
  addWord,
  editWord,
  removeWord,
};
