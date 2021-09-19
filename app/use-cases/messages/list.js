module.exports = function makeMessagesList({messagesDb}) {
  return async function listAll({body, params, query, principal}, io, redisClient) {
    const {channel} = params;
    const {page} = query || 1;
    // get messages
    return await messagesDb(redisClient).findLastAll(principal.username, channel, page);
  }
};