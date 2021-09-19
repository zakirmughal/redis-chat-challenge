module.exports = function makeProfile({usersDb}) {
  return async function userProfile({body, params, query}, io, redisClient) {
    const {username} = params;

    // if param missing
    if (!username) {
      throw new Error('Missing Username');
    }

    // get user
    const user = await usersDb(redisClient).findOne(username.toLowerCase());

    // check user found?
    if (!user || !user.username) {
      throw new Error('User not found');
    }

    delete user.password;
    // return channel
    return user
  }
}