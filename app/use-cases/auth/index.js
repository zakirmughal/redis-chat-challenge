const makeRegister = require('./register');
const makeLogin = require('./login');

const {usersDb} = require('../../data-access');

const doRegister = makeRegister({usersDb});
const doLogin = makeLogin({usersDb});

module.exports = {
  doRegister,
  doLogin
}