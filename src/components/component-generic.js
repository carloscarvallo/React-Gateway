import React from 'react';
import jQuery from 'jquery';

export default class CommentBox extends React.Component {
    
    constructor() {
        super();
        this.state = {
            showComments: false,
            comments: []
        };
    }
    
    _fetchComments() {
        jQuery.ajax({
            method: 'GET',
            url: 'comments.json',
            success: (comments) => {
                this.setState({ comments })
            }
        });
    }
    
    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }
    
    _getComments() {
        return this.state.comments.map(( comment ) => {
            return(
                <Comment result={comment.result} protocol={comment.protocol} key={comment.id} />
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
    
    // Fetch data from server before component is rendered.
    componentWillMount() {
        this._fetchComments();
    }
    
    componentDidMount() {
        // polling
        this._timer = setInterval(() => this._fetchComments(), 1000);
    }
    // Run when component is about to be removed
    componentWillUmount() {
        clearInterval(this._timer);
    }
    
    render() {
        let buttonText = 'Show Comments';
        const comments = this._getComments();
        let commentNodes;
        if (!this.state.showComments) {
            buttonText = 'Hide comments';
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
                <p className="comment-header">{this.props.result}</p>
                <p className="comment-body">{this.props.protocol}</p>
                <div className="comment-footer">
                    {/*
                    <a href="#" className="comment-footer-delete">
                        Delete comment
                    </a>
                    */}
                </div>
            </div>
        );
    }
}