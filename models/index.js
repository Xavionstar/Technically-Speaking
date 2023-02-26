const BlogPosts = require('./BlogPosts');
const Users = require('./users');
const Comment = require('./comment')

Users.hasMany(BlogPosts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

  Users.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  BlogPosts.belongsTo(Users, {
    foreignKey: 'user_id'
  });
  BlogPosts.hasMany(Comment, {
    foreignKey: 'blogpost_id'
  });

  Comment.belongsTo(Users, {
    foreignKey: 'user_id'
  });
  Comment.belongsTo(BlogPosts, {
    foreignKey: 'blogpost_id'
  });
module.exports = {BlogPosts, Users, Comment}