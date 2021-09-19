const makeNewMessage = require('./new-message');
const makeMessagesList = require('./list');
const makeMessagesSearchList = require('./search-message');

const {usersDb, messagesDb, channelsDb} = require('../../data-access');

const sendMessage = makeNewMessage({messagesDb, channelsDb});
const getMessages = makeMessagesList({messagesDb});
const searchMessages = makeMessagesSearchList({messagesDb});

module.exports = {
  sendMessage,
  getMessages,
  searchMessages
}