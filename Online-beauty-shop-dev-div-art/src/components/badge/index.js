import React, { Component } from 'react'
import './style.css'

class Badge extends Component {
    render() {
        return (
        	<div className="d-inline-block text-center bg-green custom-badge text-white">
	            {this.props.count}
			</div>
        );
    }
}

export default Badge