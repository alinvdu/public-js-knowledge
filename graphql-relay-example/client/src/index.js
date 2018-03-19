import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { QueryRenderer, graphql } from 'react-relay';
import environment from './Environment';

const AppAllPostQuery = graphql`
    query srcQuery {
        viewer {
            id,
            showAddPostDetails,
            ...PostList_viewer,
        }
    }
`;

ReactDOM.render(<QueryRenderer
    environment={environment}
    query={AppAllPostQuery}
    variables={{}}
    render={({error, props}) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        return <App viewer={props.viewer} />
      }

      return <div>Loading</div>;
    }}
  />, document.getElementById('root'));
registerServiceWorker();
