import React, { Component } from 'react'
import './input.css'

class TextArea extends Component {
    thisRef = ref => {
        this.props.inputRef(ref)
        this.input = ref
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}:</label>
                {
            		this.props.required
                	? 	<sup style={{color: '#70C49C'}}><small>&#9733;</small></sup>
                	: 	''
                }
                <textarea 
                    className="form-control"
                    placeholder={this.props.placeholder}
                    ref={this.thisRef}
                    defaultValue={this.props.value}
                    rows="3"></textarea>
                <small className="color-grey">{this.props.bottomText}</small>
            </div>
        );
    }
}

export default TextArea