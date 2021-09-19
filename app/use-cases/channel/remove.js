module.exports = function makeRemoveChannel({channelsDb}) {
  return async function remove({body, params, query}, io, redisClient) {
    const {channel} = params;

    // if param missing
    if (!channel) {
      throw new Error('Missing channel name');
    }
    // check username availability
    if (!(await channelsDb(redisClient).exists(channel))) {
      throw new Error('Channel not exists');
    }
    // remove new channel
    const channels = await channelsDb(redisClient).remove(channel);

    // return channel
    return channels
  }
}