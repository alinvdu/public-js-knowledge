const { connectionFromPromisedArray, cursorForObjectInConnection } = require('graphql-relay');

module.exports = {
    Query: {
        viewer: async (parent, args, { Post }) => {
            try {
                const allPosts = await Post.getPosts();
                return {
                    id: 'DummyId',
                    allPosts: () => connectionFromPromisedArray(Post.getPosts(), args)
                }
            } catch (err) {
                // TODO Implement custom error handling
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createPost: async (parent, { input }, { Post }) => {
            try {
                const post = await Post.createPost(input.description, input.imageUrl);
                const allPosts = await Post.getPosts();

                return {
                    post: {
                        cursor: cursorForObjectInConnection(allPosts, ),
                        node: post
                    }
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    }
}
