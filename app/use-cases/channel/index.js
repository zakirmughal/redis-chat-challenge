const makeListAllChannel = require('./list');
const makeAddChannel = require('./add');
const makeRemoveChannel = require('./remove');
const makeChannelWiseUser = require('./user-by-channel');

const {channelsDb} = require('../../data-access');

const listAll = makeListAllChannel({channelsDb});
const add = makeAddChannel({channelsDb});
const remove = makeRemoveChannel({channelsDb});
const getUsernameInChannel = makeChannelWiseUser({channelsDb});


module.exports = {
  listAll,
  add,
  remove,
  getUsernameInChannel
}