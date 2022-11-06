const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'createdBy',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'createdBy',
});

module.exports = { User, Post };