import React, { Component } from 'react'
import './checkbox.css'

class SmallCheckBox extends Component {
	onChange = e => {
		this.props.onChange(e.target.checked)
	}

    render() {
        return (
            <span className="position-relative form-check d-inline">
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    defaultChecked={this.props.value} 
                    onChange={e => this.props.onChange(e)} 
                    ref={this.props.inputRef} />
            </span>
        );
    }
}

export default SmallCheckBox