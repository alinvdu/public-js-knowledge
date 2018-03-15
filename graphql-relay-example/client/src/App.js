import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './Environment';

import PostList from './post/PostList';
import AddPost from './post/AddPost';

const AppAllPostQuery = graphql`
  query AppAllPostQuery {
    viewer {
      id,
      ...PostList_viewer
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div>
        <QueryRenderer
          environment={environment}
          query={AppAllPostQuery}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {
              return (
                <div>
                  <div className="header">
                    <AddPost viewer={props.viewer} />
                  </div>
                  <PostList viewer={props.viewer} />
                </div>
              );
            }

            return <div>Loading</div>;
          }}
        />
      </div>
    );
  }
}

export default App;
