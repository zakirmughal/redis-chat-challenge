const makeProfile = require('./profile');
const makeSearch = require('./search');

const {usersDb} = require('../../data-access');

const getProfile = makeProfile({usersDb});
const search = makeSearch({usersDb});

module.exports = {
  getProfile,
  search
}