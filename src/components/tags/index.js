import React, { Component } from 'react'
import { history } from 'store'

class Tag extends Component {

	search = e => {
		e.preventDefault()
		history.push(`/search#type=services&category=${this.props.catId}`)
	}

    render() {
        return (
            <span className="tag bg-grey text-white" onClick={this.search}>{this.props.title}</span>
        );
    }
}

export default Tag