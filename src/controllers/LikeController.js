const { uniqBy } = require('lodash');
const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists'});
    }

    console.log('LOGGED DEV: ', loggedDev._id, loggedDev.likes);
    console.log('TARGET DEV: ', targetDev._id, targetDev.likes);

    if (targetDev.likes.includes(user)) {
      console.log('DEU MATCH');
    }

    const likes = [...loggedDev.likes, targetDev._id];
    const flatLikes = uniqBy(likes, 'ObjectId');
    loggedDev.likes = flatLikes;

    console.log('likes: ', flatLikes);
    

    await loggedDev.save();
    
    return res.json(loggedDev);    
  }
}