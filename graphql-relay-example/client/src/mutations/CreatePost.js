import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime'

import environment from './../Environment';

const mutation = graphql`
    mutation CreatePostMutation($input: CreatePostInput!) {
        createPost(input: $input) {
            post {
                node {
                    id
                    description
                    imageUrl
                }
            }
        }
    }
`

export default (description, imageUrl, viewer, onCompleted, onError) => {
    const variables = {
        input: {
            description,
            imageUrl
        }
    }

    commitMutation(environment,
    {
        mutation,
        variables,
        onCompleted,
        onError,
        updater: store => {
            const createPostField = store.getRootField('createPost');
            const newPost = createPostField.getLinkedRecord('post');

            const viewerProxy = store.get(viewer.id);
            const connection = ConnectionHandler.getConnection(viewerProxy, 'PostList_allPosts');

            if (connection) {
                ConnectionHandler.insertEdgeAfter(connection, newPost);
            }
        }
    });
};
