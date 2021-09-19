
module.exports = function makeChannelList({channelsDb}) {
  return async function listAll({body, params, query}, io, redisClient) {
    // get channels
    const channels = await channelsDb(redisClient).findAll();

    // return channel
    return channels
  }
}