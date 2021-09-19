const Utils = require('../services/utils')
module.exports = function makeChannelsDb(redisClient) {
  return Object.freeze({
    exists,
    insert,
    remove,
    findAll,
    getAllUsersByChannel
  });

  async function exists(channel) {
    // 0 = available, 1 = not available
    return await redisClient.sismember('channels', Utils.toSlug(channel));
  }

  async function insert(channel) {
    return await redisClient.sadd('channels', Utils.toSlug(channel));
  }

  async function remove(channel) {
    return await redisClient.srem('channels', Utils.toSlug(channel));
  }

  async function findAll() {
    return await redisClient.smembers('channels');
  }

  async function getAllUsersByChannel(channel) {
    return await redisClient.call('FT.AGGREGATE', 'idx:messages', `@channel:{${Utils.toSlug(channel)}}`, 'GROUPBY', '1', '@username');
  }
}