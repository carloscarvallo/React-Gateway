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
                <Comment 
                    result={comment.result}
                    protocol={comment.protocol}
                    host={comment.host}
                    url={comment.url}
                    id={comment.id}
                    key={comment.id} />
            );
        });
    }
    
    _getCommentsTitle( commentCount ) {
        if (commentCount === 0) {
            return 'No request yet';
        } else if (commentCount === 1) {
            return '1 request';
        } else {
            return `${commentCount} requests`;
        }
    }
    
    // Fetch data from server before component is rendered.
    componentWillMount() {
        this._fetchComments();
    }
    
    componentDidMount() {
        // polling
        this._timer = setInterval(() => this._fetchComments(), 4000);
    }
    // Run when component is about to be removed
    componentWillUmount() {
        clearInterval(this._timer);
    }
    
    render() {
        const comments = this._getComments();
        return(
            <div className="comment-box">
                <h3>Traffic</h3>
                <h4 className="comment-count">{this._getCommentsTitle( comments.length )}</h4>
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Result</th>
                            <th>Protocol</th>
                            <th>Host</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    {comments}
                </table>
            </div>
        );
    }
}

class Comment extends React.Component {
    
    _getClass( data ) {
        let classN;
        switch (data) {
            case "200":
                classN = "success";
                break;
            case "302":
                classN = "info";
                break;
            case "404":
                classN = "danger";
                break;
            default:
                classN = "";
        }
        return classN;
    }
    
    render() {
        return(
            <tbody>
                <tr className={this._getClass(this.props.result)}>
                    <td>{this.props.id}</td>
                    <td>{this.props.result}</td>
                    <td>{this.props.protocol}</td>
                    <td>{this.props.host}</td>
                    <td>{this.props.url}</td>
                </tr>
            </tbody>
        );
    }
}