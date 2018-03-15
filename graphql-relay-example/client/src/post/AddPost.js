import React, { Component } from 'react';
import CreatePostMutation from './../mutations/CreatePost';

export default class AddPost extends Component {
    state = {
        showAddPostFields: false,
        description: null,
        imageUrl: null      
    };

    render() {
        const { showAddPostFields } = this.state;
        return (
            <div className="w-100 flex justify-center">
                <div className="bb add-post-wrapper" style={{ width: 560 }}>
                {!showAddPostFields ? 
                    (
                        <div
                            className="add-post-generic-button ba"
                            onClick={() => this.setState({showAddPostFields: true})}>
                            ADD POST
                        </div>
                    ) :
                    (
                        <div className="add-post-input-fields">
                            <div className="add-post-title-wrapper bb">
                                <span className="add-post-title">Adding a post</span>
                                <span onClick={() => {
                                    if (!this.state.description || !this.state.imageUrl) {
                                        alert('add description and/or imageUrl');
                                    } else {
                                        CreatePostMutation(this.state.description, this.state.imageUrl, this.props.viewer,
                                            () => alert('added post'), () => alert('could not add post'));
                                    }
                                }} className="add-post-generic-button ba">Add</span>
                                <span
                                    className="add-post-generic-button ba"
                                    onClick={() => this.setState({showAddPostFields: false})}
                                >
                                    Back
                                </span>
                            </div>
                            <span>Description</span>
                            <input type="text" onChange={e => this.setState({
                                description: e.target.value
                            })} />
                            <span>Image url</span>
                            <input type="text" onChange={e => this.setState({
                                imageUrl: e.target.value
                            })} />
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}
