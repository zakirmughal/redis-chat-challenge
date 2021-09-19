module.exports = function makeChannelWiseUser({channelsDb}) {
  return async function getUsernameInChannel({body, params, query}, io, redisClient) {
    const {channel} = params;
    // if param missing
    if (!channel) {
      throw new Error('Missing channel name');
    }

    // get usernames
    const usernames = await channelsDb(redisClient).getAllUsersByChannel(channel);

    if (!usernames) {
      return {users: []}
    }
    // return channel
    return {users: usernames[1].filter(u => u !== "username")};
  }
}