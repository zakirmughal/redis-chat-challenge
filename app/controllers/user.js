const {
  getProfile,
  search
} = require('../use-cases/user');

const getUserProfile = async function (httpRequest, io, redisClient) {
  return await getProfile(httpRequest, io, redisClient);
};

const getSearch = async function (httpRequest, io, redisClient) {
  return await search(httpRequest, io, redisClient);
};

module.exports = {
  getUserProfile,
  getSearch
}