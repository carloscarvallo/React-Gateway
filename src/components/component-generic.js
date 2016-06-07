import React from 'react';
import jQuery from 'jquery';

export default class CommentBox extends React.Component {
    
    constructor() {
        super();
        this.state = {
            showComments: false,
            comments: [
                { id: 1, author: 'Morgan McCircuit', body: 'Great Picture!' },
                { id: 2, author: 'Bending Bender', body: 'Excellent Stuff' }
            ]
        };
    }
    
    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }
    
    _getComments() {
        return this.state.comments.map(( comment ) => {
            return(
                <Comment author={comment.author} body={comment.body} key={comment.id} />
            );
        });
    }
    
    _getCommentsTitle( commentCount ) {
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return '1 comment';
        } else {
            return `${commentCount} comments`;
        }
    }
    
    
    render() {
        let buttonText = 'Show comments';
        const comments = this._getComments();
        let commentNodes;
        if (this.state.showComments) {
            let buttonText = 'Hide Comments';
            commentNodes = <div className="comment-list">{comments}</div>;
        }
        return(
            <div className="comment-box">
                <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
                <h3>Comments</h3>
                <h4 className="comment-count">{this._getCommentsTitle( comments.length )}</h4>
                <div className="comment-list">
                    {commentNodes}
                </div>
            </div>
        );
    }
}

class Comment extends React.Component {
    render() {
        return(
            <div className="comment">
                <p className="comment-header">{this.props.author}</p>
                <p className="comment-body">{this.props.body}</p>
                <div className="comment-footer">
                    <a href="#" className="comment-footer-delete">
                        Delete comment
                    </a>
                </div>
            </div>
        );
    }
}