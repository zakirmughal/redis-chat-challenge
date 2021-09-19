const Utils = require('../../services/utils');
const {Token} = require('../../gaurds');

module.exports = function makeLogin({usersDb}) {
  return async function doLogin({body, params, query}, io, redisClient) {
    const {username, password} = body;

    // if param missing
    if (
      !username ||
      !password
    ) {
      throw new Error('Missing param');
    }

    // get user
    const user = await usersDb(redisClient).findOne(username.toLowerCase());

    // check user found?
    if(!user){
      throw new Error('User not found');
    }

    // verify password
    if(!Utils.comparePasswordHash(password, user.password)){
      throw new Error('Wrong password');
    }


    delete user.password;

    // return user + sign token for auto login
    return {...user, token: Token.signToken({name: user.firstname + ' ' + user.lastname, username: username.toLowerCase()})}
  }
}