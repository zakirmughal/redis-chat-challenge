const Utils = require('../../services/utils');
const {Token} = require('../../gaurds');

module.exports = function makeRegister({usersDb}) {
  return async function doRegister({body, params, query}, io, redisClient) {
    const {firstname, lastname, city, country, username, password} = body;

    // if param missing
    if (
      !firstname ||
      !lastname ||
      !city ||
      !country ||
      !username ||
      !password
    ) {
      throw new Error('Missing param');
    }

    // check username availability
    if (await usersDb(redisClient).exists(username.toLowerCase())) {
      throw new Error('Username already exists');
    }

    // generate password hash
    const passwordHash = Utils.generatePasswordHash(password);

    // insert user
    const user = await usersDb(redisClient).insert({
      firstname, lastname, city, country, username: username.toLowerCase(), password: passwordHash
    });

    delete user.password;

    // return user + sign token for auto login
    return {...user, token: Token.signToken({name: firstname + ' ' + lastname, username})}
  }
};