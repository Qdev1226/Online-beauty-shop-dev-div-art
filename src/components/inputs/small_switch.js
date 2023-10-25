import React, { Component } from 'react'
import './radio_switch.css'

class SmallSwitch extends Component {
	state = {
		value: this.props.value,
	}

	onClick = e => {
		this.setState({
			value: this.props.value
		})
		this.props.onChange(this.props.value)
	}

    render() {
    	const activeClass = this.state.value === this.props.checked ? 'input active' : 'input'
        return (
        	<div className={this.props.className}>
        		<div className="radio-container">
        			<span className={activeClass}></span>
        			<span className="checkmark" onClick={this.onClick}></span>
        		</div>
        		<span className="color-grey">&nbsp;&nbsp;{this.props.title}</span>
			</div>
        );
    }
}

export default SmallSwitch