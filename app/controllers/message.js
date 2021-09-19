const {
  sendMessage,
  getMessages,
  searchMessages
} = require('../use-cases/messages');

const SendNewMessage = async function (httpRequest, io, redisClient) {
  return await sendMessage(httpRequest, io, redisClient);
};

const getAllChannelMessages = async function (httpRequest, io, redisClient) {
  return await getMessages(httpRequest, io, redisClient);
};

const getSearchMessages = async function (httpRequest, io, redisClient) {
  return await searchMessages(httpRequest, io, redisClient);
};

module.exports = {
  SendNewMessage,
  getAllChannelMessages,
  getSearchMessages
}