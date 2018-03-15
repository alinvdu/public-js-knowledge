const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    description: String,
    imageUrl: String
});

postSchema.plugin(autoIncrement.plugin, {model: 'Post', field: 'id'});
const Post = mongoose.model('Post', postSchema);

exports.createPost = (description, imageUrl) => new Promise((resolve, reject) => {
    const newPost = new Post({
        description,
        imageUrl
    });

    newPost.save().then(post => resolve(post)).catch(err => reject(err));
});

exports.getPosts = () => new Promise((resolve, reject) => Post.find().then(posts => resolve(posts)).catch(err => reject(err)));
