const Utils = require('../services/utils')
module.exports = (redisClient) => {
  return Object.freeze({
    findOne,
    exists,
    insert,
    update,
    remove,
    search
  });

  async function exists(username) {
    // 0 = available, 1 = not available
    return await redisClient.sismember('usernames', username);
  }

  async function findOne(username) {
    return await redisClient.hgetall(`user:${username}`);
  }

  async function insert(user) {
    return await Promise.all([
      redisClient.hset(`user:${user.username}`, user),
      redisClient.sadd('usernames', user.username)
    ]);
  }

  async function update(username, user) {
    if (!exists(username)) {
      return null;
    }

    return await redisClient.hset(`user:${username}`, user);
  }

  async function remove(username) {
    if (!exists(username)) {
      return null;
    }

    return await Promise.all([
      redisClient.del(`user:${username}`),
      redisClient.srem('usernames', username)
    ]);

  }

  async function search(keywords, page = 1) {
    const limit = 10;
    const offset = (page - 1) * limit
    let search = '';
    for (let key in keywords) {
      if (keywords[key]) {
        if (keywords[key]['cond'] === 'like') {
          search += ` @${key}:{${keywords[key]['operand'].join('|')}} `;
        } else {
          keywords[key]['operand'].forEach(o => {
            search += ` @${key}:${o}|`;
          })
          search = search.replace(/\|+$/, '');
        }
      }
    }
    const result = await redisClient.call('FT.SEARCH', 'idx:users', search, 'LIMIT', offset, offset + limit);

    if (!result || result.length === 0 || result[0] === 0) {
      return [];
    }

    return Utils.parseRedisData(result);
  }
}