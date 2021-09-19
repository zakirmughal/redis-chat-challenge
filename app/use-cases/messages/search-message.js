module.exports = function makeMessagesSearchList({messagesDb}) {
  return async function searchAll({body, params, query, principal}, io, redisClient) {
    const {channel} = params;
    const {page} = query || 1;
    let {keywords} = body;

    if (channel) {
      if (!keywords) {
        keywords = {};
      }
      keywords.channel = {
        operand: [channel],
        cond: 'like'
      }
    }
    // get messages
    return await messagesDb(redisClient).search(keywords, page);
  }
};