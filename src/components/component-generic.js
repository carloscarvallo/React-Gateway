import React from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:8081');

export default class LoggerBox extends React.Component {

    constructor() {
        super();
        this.state = {
            showLoggers: false,
            loggers: []
        };
    }

    _getLoggers() {
        return this.state.loggers.map(( logger ) => {
            return(
                <Logger
                    ip={logger.ip}
                    result={logger.result}
                    protocol={logger.protocol}
                    method={logger.method}
                    host={logger.host}
                    url={logger.url}
                    id={logger.id}
                    key={logger.id} />
            );
        });
    }

    _getLoggersTitle( loggerCount ) {
        if (loggerCount === 0) {
            return 'No request yet';
        } else if (loggerCount === 1) {
            return '1 request';
        } else {
            return `${loggerCount} requests`;
        }
    }

    // Fetch data from server before component is rendered.
    componentWillMount() {
        // this._fetchLoggers();
    }

    componentDidMount() {
        // polling
        socket.on('request', (request) => {
            var request = JSON.parse(request);
            request.id = Date.now();
            this.setState({
                loggers: this.state.loggers.concat([request])
            });
            console.log('request', request);
        });
    }
    // Run when component is about to be removed
    componentWillUmount() {
        //clearInterval(this._timer);
    }

    render() {
        const loggers = this._getLoggers();
        return(
            <div className="logger-box">
                <h3>Traffic</h3>
                <h4 className="logger-count">{this._getLoggersTitle( loggers.length )}</h4>
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>IP</th>
                            <th>Result</th>
                            <th>Protocol</th>
                            <th>Method</th>
                            <th>Host</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    {loggers}
                </table>
            </div>
        );
    }
}

class Logger extends React.Component {

    _getClass( data ) {
        let classN;
        switch (data) {
            case 200:
                classN = "success";
                break;
            case 302:
                classN = "info";
                break;
            case 404:
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
                <tr className={this._getClass( this.props.result )}>
                    <td>{this.props.id}</td>
                    <td>{this.props.ip}</td>
                    <td>{this.props.result}</td>
                    <td>{this.props.protocol}</td>
                    <td>{this.props.method}</td>
                    <td>{this.props.host}</td>
                    <td>{this.props.url}</td>
                </tr>
            </tbody>
        );
    }
}
