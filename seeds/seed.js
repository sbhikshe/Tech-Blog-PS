const sequelize = require('../config/connection');
const { User, Post, PostComment } = require('../model');

const userSeedData = require('./userSeedData.json');
const postSeedData = require('./postSeedData.json');
const commentSeedData = require('./postCommentSeedData.json');

const seed = async () => {
  await sequelize.sync({ force: true });

  const userData = await User.bulkCreate(userSeedData);
  if (userData) {
    console.log("User seeded" + userData);
  } else {
    console.log("User not seeded" + userData);
  }

  const postData = await Post.bulkCreate(postSeedData);
  if (postData) {
    console.log("Post seeded" + postData);
  } else {
    console.log("Post not seeded" + postData);
  }

  const commentData = await PostComment.bulkCreate(commentSeedData);
  if (commentData) {
    console.log("Comments seeded" + commentData);
  } else {
    console.log("Comments not seeded" + commentData);
  }
  /* wait for asynchronous operations to complete before exiting */
  process.exit(0);

};

seed();
