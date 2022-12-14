// jsonwebtoken을 가져와서 처리하는 모듈

const jwt = require('jsonwebtoken');
const userDatabase = require('../Database');

const signin = (req, res) => {};

const accesstoken = (req, res) => {};

const refreshtoken = (req, res) => {};

const signinSuccess = (req, res) => {};

const logout = (req, res) => {};

module.exports = {
  signin,
  accesstoken,
  refreshtoken,
  signinSuccess,
  logout,
};
