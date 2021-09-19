require('dotenv').config();
const express = require('express');
const router = express.Router();
const redis = require('ioredis');
const makeExpressCallback = require('./make-callback');
const {Token} = require('./gaurds');

const redisClient = new redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD
});

// create indices
const createIndices = async () => {
  await Promise.all([
    redisClient.call('FT.CREATE', 'idx:users', 'ON', 'HASH', 'PREFIX', '1', 'user', 'SCHEMA', 'firstname', 'TEXT', 'lastname', 'TEXT', 'city', 'TAG', 'SORTABLE', 'country', 'TAG', 'SORTABLE', 'username', 'TAG', 'SORTABLE'),
    redisClient.call('FT.CREATE', 'idx:messages', 'ON', 'HASH', 'PREFIX', '1', 'message', 'SCHEMA', 'username', 'TAG', 'SORTABLE', 'channel', 'TAG', 'SORTABLE', 'message', 'TEXT')
  ]);
};

const flushDatabase = async () => {
  await redisClient.flushdb();
};

//controller
const authController = require('./controllers/auth');
const channelController = require('./controllers/channel');
const userController = require('./controllers/user');
const messageController = require('./controllers/message');

// flush database
// flushDatabase();

// call indices
//createIndices();

module.exports = (io) => {

  // Auth end points
  router.route('/register').post(makeExpressCallback(authController.doRegisterForChat, io, redisClient));
  router.route('/login').post(makeExpressCallback(authController.doLoginForChat, io, redisClient));
  router.use(async function (req, res, next) {
    const tokenResponse = await Token.verifyToken(req, redisClient);
    if(!tokenResponse || !tokenResponse.success){
      return res.status(403).send(tokenResponse);
    }
    next();
  });
  router.route('/channel')
    .get(makeExpressCallback(channelController.listAllChannels, io, redisClient))
    .post(makeExpressCallback(channelController.patchChannel, io, redisClient))
  ;
  router.route('/channel/:channel')
    .get(makeExpressCallback(channelController.channelWiseUsers, io, redisClient))
    .delete(makeExpressCallback(channelController.deleteChannel, io, redisClient))
  ;
  router.route('/user/:username').get(makeExpressCallback(userController.getUserProfile, io, redisClient));
  router.route('/user-search').post(makeExpressCallback(userController.getSearch, io, redisClient));
  router.route('/message/:channel')
    .post(makeExpressCallback(messageController.SendNewMessage, io, redisClient))
    .get(makeExpressCallback(messageController.getAllChannelMessages, io, redisClient))
  ;
  router.route('/message-search').post(makeExpressCallback(messageController.getSearchMessages, io, redisClient));
  router.route('/message-search/:channel').post(makeExpressCallback(messageController.getSearchMessages, io, redisClient));

  return router;
}