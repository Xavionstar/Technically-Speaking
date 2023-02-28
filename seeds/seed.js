const sequelize = require('../config/connection');
const { Users, BlogPosts, Comment } = require('../models');

//this seed data was for testing purposes to show multiple users and blogposts and comments on the site but once i could make users i dont need them
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./comment.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  

  for (const postContent of postData) {
    await BlogPosts.create({
      ...postContent,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

 await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
