module.exports = function makeNewMessage({messagesDb, channelsDb}) {
  return async function sendMessage({body, params, query, principal}, io, redisClient) {
    const {channel} = params;
    const {message} = body;

    // if param missing
    if (!channel) {
      throw new Error('Missing channel');
    }
    if (!message) {
      throw new Error('Missing message');
    }

    // get user
    const messageResponse = await messagesDb(redisClient).insert(channel,
      {username: principal.username, message, channel});

    // get usernames
    let getChannelUser = await channelsDb(redisClient).getAllUsersByChannel(channel);
    getChannelUser = getChannelUser[1].filter(u => u !== "username" || u !== principal.username)

    // emit message
    io.emit("message", {users: getChannelUser, message, channel, from: principal.username});
    // return channel
    return {message}
  }
}