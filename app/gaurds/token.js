const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const {sign, verify} = require('jsonwebtoken');
const {promisify} = require('util');

const Config = require('../../config');

/*
 * Sign token for further use of api
 * @param data: Object
 * @returns String
 */
function signToken(data) {
  return sign(data, Config.jwtSecretKey, {
    expiresIn: "24h"
  });
}

/*
 * Verify token of api
 * @param token: string
 * @returns {Promise<Object>}
 */
async function verifyToken(req, redisClient) {
  let token = req.headers['x-access-token'];

  // if not token return 403
  if (!token) {
    return {
      success: false,
      error: {
        description: 'Missing token'
      }
    };
  }

  try {
    // verify JWT token
    const content = await verify(token, Config.jwtSecretKey);

    // if not verify then return error
    if (!content) {
      return {success: false, message: 'Access denied'};
    }

    // get user from token
    const user = await redisClient.hgetall(`user:${content.username}`)
    if (!user) {
      return {
        success: false,
        error: {
          description: 'Token Expire'
        }
      };
    }
    req.principal = user;

    return {
      success: true,
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: {
        description: 'Failed to authenticate token'
      }
    };
  }
}

module.exports = {
  signToken,
  verifyToken
}