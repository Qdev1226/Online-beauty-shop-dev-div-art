import React, { Component } from 'react'
import './radio_switch.css'

class RadioSwitch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: this.props.value,
		} 
	}

	onClick = e => {
		this.setState({
			value: this.props.value
		})
		this.props.onChange(this.props.value)
	}

    render() {
        return (
        	<div style={this.props.style}>
        		{
        			this.state.value === this.props.checked
        			?	<span className="radio-switch check" onClick={this.onClick}><i className="fas fa-check"></i></span>
        			: 	<span className="radio-switch pointer" onClick={this.onClick}><i className="fas fa-check"></i></span>
        		}
        		<span className="color-grey">&nbsp;&nbsp;{this.props.title}</span>
			</div>
        );
    }
}

export default RadioSwitch