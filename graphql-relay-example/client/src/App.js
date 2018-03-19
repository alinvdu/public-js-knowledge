import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PostList from './post/PostList';
import AddPost from './post/AddPost';

class App extends Component {
  render() {
      return (
        <div>
          <div className="header">
            <AddPost viewer={this.props.viewer} />
          </div>
          <PostList viewer={this.props.viewer} />
        </div>
      );
    }
}

export default App;
