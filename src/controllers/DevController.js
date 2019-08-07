const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { username: user } = req.body;

    const userExists = await Dev.findOne({ user });

    if (userExists) {
      return res.json(userExists);
    }

    try {
      const { data } = await axios.get(`https://api.github.com/users/${user}`);
      const { name, bio, avatar_url: avatar } = data;

      const dev = await Dev.create({
        user,
        name,
        bio,
        avatar,
      });

      return res.json(dev);

    } catch (error) {
      const { status, statusText } = error.response;
     
      return res.status(status).json({ status, statusText });
    }
  }
}