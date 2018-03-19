import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';
import deletePostMutation from './../mutations/DeletePost';

class Post extends React.Component {
    handleDelete() {
        deletePostMutation(this.props.post.id, this.props.viewer);
    }

    render() {
        return (
            <div className="pa3 bg-black-05 ma3">
                <div className="w-100"
                    style={{
                        backgroundImage: `url(${this.props.post.imageUrl})`,
                        backgroundSize: 'cover',
                        paddingBottom: '100%'
                    }}
                />
                <div className="pt3">
                    {this.props.post.description}
                    <span className="red f6 pointer dim" onClick={this.handleDelete.bind(this)}>Delete</span>
                </div>
            </div>
        );
    }
}

export default createFragmentContainer(Post, graphql`
    fragment Post_viewer on Viewer {
        id
    }
    fragment Post_post on Post {
        id,
        description,
        imageUrl
    }
`);
