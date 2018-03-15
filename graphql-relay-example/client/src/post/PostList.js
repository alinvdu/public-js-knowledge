import React from "react";
import { createFragmentContainer, graphql } from 'react-relay';

import Post from './Post';

class PostList extends React.Component {
    render() {
        console.log(this.props.viewer.allPosts);
        return (
            <div className="w-100 flex justify-center">
                <div className="w-100" style={{maxWidth: 600}}>
                    {this.props.viewer.allPosts ? this.props.viewer.allPosts.edges.map(({ node }, i) =>
                        <Post key={i} post={node} viewer={this.props.viewer} />) : null}
                </div>
            </div>
        )
    }
}

export default createFragmentContainer(PostList, graphql`
    fragment PostList_viewer on Viewer {
        ...Post_viewer,
        allPosts(last: 100) @connection(key: "PostList_allPosts", filters: []) {
            edges {
                node {
                    id,
                    description,
                    imageUrl,
                    ...Post_post
                }
            }
        }
    }
`);
