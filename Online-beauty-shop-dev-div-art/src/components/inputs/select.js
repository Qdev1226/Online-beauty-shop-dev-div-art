import React, { Component } from 'react'

class Select extends Component {
	
	printOptions = (item, i) =>
		(
			<option key={i} value={item.key ? item.key : i}>
				{item.value ? item.value : item}
			</option>
		)
    
    render() {
        const { disabled, onChange, className, options, selected, label } = this.props;
        return (
        	<div className="form-group">
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
				<select
					disabled={disabled}
					className={`form-control ${className}`}
					defaultValue={selected}
					onChange={onChange} >
	                	{ options.map((item, i) => this.printOptions(item, i)) }
	            </select>
            </div>
        );
    }
}

export default Select