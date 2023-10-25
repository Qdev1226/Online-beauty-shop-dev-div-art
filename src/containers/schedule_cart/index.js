import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { getService, getTempVoucher, getAvailableTimes } from 'actions/services'
import { getCredits } from 'actions/user'
import { setScheduleStep, setScheduleTotal } from 'actions/schedule_cart'
import StepsArrow from 'components/steps/steps_arrow'
import { StepFirst, StepSecond, StepThird, StepFourth } from 'components/schedule_cart'
import { getCurrentDate, getLastDateMonth } from 'utils/date'

class ScheduleCart extends Component {
	constructor(props) {
		super(props)
		if (props.location.state) {
			store.dispatch(setScheduleTotal(props.location.state.price))
			store.dispatch(setScheduleStep(1))
			store.dispatch(getService(props.match.params.id))
			store.dispatch(getCredits())
			store.dispatch(getTempVoucher(props.match.params.id))
			store.dispatch(getAvailableTimes(props.match.params.id, getCurrentDate(), getLastDateMonth()))
			
			this.steps = [{title: 'Agendamento'}, {title: 'Pagamento'}, {title: 'Confirmação'}]
		} else {
			history.push('/')
		}
	}

	changeStep = step => e => {
		store.dispatch(setScheduleStep(step))
	}

	getStep = () => {
		switch(this.props.schedule_cart.step) {
			case 1: return <StepFirst step={this.props.schedule_cart.step} service={this.props.location.state} />
			case 2: return <StepSecond step={this.props.schedule_cart.step} />
			case 3: return <StepThird step={this.props.schedule_cart.step} service={this.props.location.state} />
			case 4: return <StepFourth step={this.props.schedule_cart.step} />
			default: return
		}
	}

    render() {
        return (
        	<div className="bg-main font-avenir pt-4">
	            <div className="container">
	            	<StepsArrow className="rounded mb-5" steps={this.steps} active={this.props.schedule_cart.step} onClick={this.changeStep} />
	            	{ this.getStep() }
	            </div>
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        schedule_cart: {
        	step: state.schedule_cart.step
        }
    })

export default connect(
    mapStateToProps
)(ScheduleCart)