import React, { Component } from 'react'
import './style.css'

class Tooltip extends Component {

    render() {
        return (
            <div id="child" className={`bg-white rounded position-absolute tooltip-wrap text-dark p-3 cursor-default ${this.props.type}`} onClick={e => e.stopPropagation()}>
            	{
            		this.props.title
            		? 	<h6 className="mb-3"><strong>{this.props.title}</strong></h6>
            		: 	''
            	}
            	<div>{React.createElement(this.props.content, {close: this.props.close, openAnother: this.props.openAnother})}</div>
            </div>
        );
    }
}

export default Tooltip