import React, { Component } from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import './range_slider.css'
import { getLang } from 'utils/lang'

class RangeSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: { min: 0, max: 10 },
		};
	}

	componentWillMount() {
		this.setState({
			value: {
				min: this.props.value.min,
				max: this.props.value.max,
			}
		})
	}

	onChange = value => {
		this.setState({ value })
		this.props.onChange(value)
	}

	render() {
		return (
			<div className="d-flex align-items-center">
				<span className="px-2 color-grey">{getLang('Mín.')}</span>
				<InputRange
					maxValue={this.props.max}
					minValue={this.props.min}
					formatLabel={value => ''}
					value={this.state.value}
					onChangeComplete={this.props.onComplete}
					onChange={this.onChange} />
				<span className="px-2 color-grey">{getLang('Máx.')}</span>
			</div>
		);
	}
}

export default RangeSlider