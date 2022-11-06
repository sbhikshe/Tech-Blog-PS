const sequelize = require('../config/connection');
const { User, Post } = require('../model');

const userSeedData = require('./userSeedData.json');
const postSeedData = require('./postSeedData.json');

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

  /* wait for asynchronous operations to complete before exiting */
  process.exit(0);

};

seed();

/*
async function seedUsers() {
  const userData = await User.BulkCreate(userSeedData);
  if (userData) {
    console.log("User seeded" + userData);
  } else {
    console.log("User not seeded" + userData);
  }
}

async function seedPosts() {
  const postData = await Post.BulkCreate(postSeedData);
  if (postData) {
    console.log("Post seeded" + postData);
  } else {
    console.log("Post not seeded" + postData);
  }
}

function seed() {
  seedUsers();
  seedPosts();
}

seed();
*/
/* wait for asynchronous operations to complete before exiting */
//process.exit(0);
