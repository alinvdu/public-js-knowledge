import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import environment from '../Environment';

const mutation = graphql`
    mutation DeletePostMutation($input: DeletePostInput!) {
        deletePost(input: $input) {
            deletedId
        }
    }
`;

export default (postId, viewer) => {
    const variables = {
        input: {
            id: postId
        }
    };

    commitMutation(
        environment,
        {
            mutation,
            variables,
            onError: err => alert(err),
            updater: (store) => {
                const deletedPost = store.getRootField('deletePost');
                const deletedId = deletedPost.getValue('deletedId');

                const viewerProxy = store.get(viewer.id);
                const connection = ConnectionHandler.getConnection(viewerProxy, 'PostList_allPosts');
                ConnectionHandler.deleteNode(connection, deletedId);
            }
        }
    )
}
