const {
  doRegister,
  doLogin
} = require('../use-cases/auth');

const doRegisterForChat = async function (httpRequest, io, redisClient) {
  return await doRegister(httpRequest, io, redisClient);
};

const doLoginForChat = async function (httpRequest, io, redisClient) {
  return await doLogin(httpRequest, io, redisClient);
};

module.exports = {
  doRegisterForChat,
  doLoginForChat
}