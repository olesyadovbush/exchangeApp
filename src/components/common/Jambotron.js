import React, { Component } from 'react';

export default class Jambotron extends Component {
    render(){
        const { title, message } = this.props;
        return(
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">{title || ''}</h1>
                    <p className="lead">{message || ''}</p>
                </div>
            </div>
        )
    }
}