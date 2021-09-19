module.exports = function makeSearch({usersDb}) {
  return async function search({body, params, query}, io, redisClient) {
    const {channel} = params;
    const {page} = query || 1;
    let {keywords} = body;

    // if param missing
    if (!keywords) {
      throw new Error('Missing Username');
    }

    // get user
    return await usersDb(redisClient).search(keywords, page);
  }
}