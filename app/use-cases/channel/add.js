module.exports = function makeAddChannel({channelsDb}) {
  return async function add({body, params, query}, io, redisClient) {
    const {channel} = body;

    // if param missing
    if (!channel) {
      throw new Error('Missing channel name');
    }
    // check username availability
    if (await channelsDb(redisClient).exists(channel)) {
      throw new Error('Channel already exists');
    }
    // create new channel
    const channels = await channelsDb(redisClient).insert(channel);

    // return channel
    return channels
  }
}