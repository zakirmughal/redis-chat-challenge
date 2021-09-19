const {
  listAll,
  add,
  remove,
  getUsernameInChannel
} = require('../use-cases/channel');

const listAllChannels = async function (httpRequest, io, redisClient) {
  return await listAll(httpRequest, io, redisClient);
};

const patchChannel = async function (httpRequest, io, redisClient) {
  return await add(httpRequest, io, redisClient);
};

const deleteChannel = async function (httpRequest, io, redisClient) {
  return await remove(httpRequest, io, redisClient);
};

const channelWiseUsers = async function (httpRequest, io, redisClient) {
  return await getUsernameInChannel(httpRequest, io, redisClient);
};

module.exports = {
  listAllChannels,
  patchChannel,
  deleteChannel,
  channelWiseUsers
}