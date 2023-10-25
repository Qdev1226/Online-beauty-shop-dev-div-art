import React, { Component } from 'react'
import './input.css'

class Input extends Component {
    render() {
        const { 
            placeholder = '',
            disabled = false,
            type = 'text',
            readonly = false,
            onChange,
            inputRef,
            onKeyDown,
            className = '',
            label = this.props.label ? `${this.props.label}:` : <span>&nbsp;</span>,
            value 
        } = this.props

        return (
                <div id="first" className="form-group">
                    <label>{label}</label>
                    {
                        this.props.required
                        ?   <sup style={{color: '#70C49C'}}><small>&#9733;</small></sup>
                        :   ''
                    }{
                        this.props.description
                        ?   <span style={{color: '#70C49C'}}> ({this.props.description})</span>
                        :   ''
                    }
                    <input 
                        type={type}
                        readOnly={readonly}
                        disabled={disabled}
                        placeholder={placeholder}
                        className={`form-control ${className}`}
                        ref={inputRef}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        defaultValue={value} />
                    <small className="color-grey">{this.props.bottomText}</small>
                </div>
        );
    }
}

export default Input