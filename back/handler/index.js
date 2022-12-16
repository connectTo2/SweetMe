const { signIn } = require('./signin');
const { logOut } = require('./logout');
const { addUser } = require('./signup');
const { getAllWords } = require('./game');
const { getVoca, addVoca, removeVoca } = require('./vocalist');
const { getWords, addWord, editWord, removeWord } = require('./wordlist');

module.exports = {
  signIn,
  logOut,
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
