const Utils = require('../services/utils')
module.exports = function makeMessagesDb(redisClient) {
  return Object.freeze({
    insert,
    findAll,
    findLastAll,
    search
  });


  async function insert(channel, message) {
    const messageId = await redisClient.xadd(`channel:${Utils.toSlug(channel)}`, '*', 'type', 'message')
    return await redisClient.hset(`message:${messageId}`, {
      username: message.username,
      channel: message.channel,
      message: message.message
    })
  }

  async function join(username, channel) {
  }

  async function leave(username, channel) {
  }

  async function findAll(channel) {
    const messages = [];
    const messageIds = await redisClient.xrange(`channel:${Utils.toSlug(channel)}`, '-', '+');
    if (!messageIds) {
      return messages;
    }
    for (let mId of messageIds) {
      messages.push(await redisClient.hgetall(`message:${mId[0]}`))
    }
  }

  async function findLastAll(username, channel, page = 1) {
    const limit = 10;
    const messages = [];
    const lastSeen = await redisClient.hget(`user:${username}`, `channel:${Utils.toSlug(channel)}`);
    let seen = true;
    const messageIds = await redisClient.xrevrange(`channel:${Utils.toSlug(channel)}`, '+', '1', 'count', page * limit);
    if (messageIds.length === 0) {
      return messages;
    }
    for (let mId of messageIds) {
      seen = seen && mId[0] !== lastSeen;
      messages.push({... await redisClient.hgetall(`message:${mId[0]}`), "seen": !seen})
    }

    // set last seen message against user profile
    await redisClient.hset(`user:${username}`, `channel:${Utils.toSlug(channel)}`, messageIds[0][0]);
    return messages;
  }

  async function findUnReadAll(username, channel, messageId) {
    const messages = [];

    const messageIds = await redisClient.xread('BLOCK', 1000, 'STREAMS', `channel:${Utils.toSlug(channel)}`, messageId);
    if (!messageIds) {
      return messages;
    }
    for (let mId of messageIds) {
      messages.push(await redisClient.hgetall(`message:${mId[0]}`))
    }

    // set last seen message against user profile
    await redisClient.hset(`user:${username}`, `channel:${Utils.toSlug(channel)}`, messageIds[0][0]);
    return messages;
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
    const result = await redisClient.call('FT.SEARCH', 'idx:messages', search, 'LIMIT', offset, offset + limit);
    if (!result || result.length === 0 || result[0] === 0) {
      return [];
    }

    return Utils.parseRedisData(result);
  }

}