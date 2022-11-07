const User = require('./User');
const Post = require('./Post');
const PostComment = require('./PostComment');

Post.belongsTo(User, {
  foreignKey: 'createdBy',
});

User.hasMany(Post, {
  foreignKey: 'createdBy',
  onDelete: 'CASCADE',
});

Post.hasMany(PostComment, {
  foreignKey: 'parentPost'
});

PostComment.belongsTo(Post, {
  foreignKey: 'parentPost'
});

User.hasMany(PostComment, {
  foreignKey: 'createdBy'
});

PostComment.belongsTo(User, {
  foreignKey: 'createdBy'
});

module.exports = { User, Post, PostComment };