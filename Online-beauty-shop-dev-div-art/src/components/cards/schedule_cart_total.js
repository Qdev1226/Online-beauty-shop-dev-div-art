import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { setScheduleStep, setScheduleUseCredits, makeAppointment } from 'actions/schedule_cart'
import BtnMain from 'components/buttons/btn_main.js'
import Price from 'components/price'
import CheckBox from 'components/inputs/checkbox.js'
import { getLang } from 'utils/lang'

class ScheduleCartTotal extends Component {
	changeStep = () => {
		if (this.props.step === 3) {
			const data = {
				professional: this.props.schedule_cart.proffesional.professional.id,
				voucher: this.props.schedule_cart.voucher.id,
				datetime: `${this.props.schedule_cart.activeDate} ${this.props.schedule_cart.activeTime}`
			}

			store.dispatch(makeAppointment(data))
			return
		}
		store.dispatch(setScheduleStep(this.props.step+1))
	}

	getTotal = () => {
        return this.props.schedule_cart.use_credits ? this.props.schedule_cart.total - this.props.user.credits / this.props.user.dollar_value : this.props.schedule_cart.total
    }

    setUseCredits = e => {
		store.dispatch(setScheduleUseCredits(e.target.checked))
	}

	getUseCredits = () => {
    	return this.props.schedule_cart.use_credits ? this.props.user.credits / this.props.user.dollar_value : 0
    }

	render() {
		return (
			<div className="rounded bg-white p-4">
				{
					this.props.step !== 2
					? 	<div className="d-flex justify-content-between color-grey">
							<div><h5>{getLang('Subtotal')}:</h5></div>
							<div><Price current={this.props.schedule_cart.total} /></div>
						</div>
					: 	<div>
							<h5>{getLang('Usar créditos')}</h5>
							<div className="d-flex justify-content-between color-grey">
								<div><Price className="d-inline-block" current={this.props.user.credits / this.props.user.dollar_value} /> {getLang('créditos')}</div>
								<div><CheckBox value={this.props.schedule_cart.use_credits} onChange={this.setUseCredits} /></div>
							</div>
						</div>
				}
				{
					this.props.step === 3 || this.props.step === 4
					? 	<div className="d-flex justify-content-between color-grey">
							<div><h5>{getLang('Créditos')}:</h5></div>
							<div><Price current={this.getUseCredits()} /></div>
						</div>
					: 	''
				}
				<div className="border-bottom mb-3 mt-3"></div>
				{
					this.props.step > 1
					? 	<div className="d-flex justify-content-between mb-3">
							<div><h5>{getLang('Total')}:</h5></div>
							<div><Price current={this.getTotal()} /></div>
						</div>
					: 	''
				}
				<div className="col-sm-10 offset-sm-1">
					{
						this.props.step === 3
						? 	<BtnMain
			                    className="btn-block btn-outline font-weight-bold"
			                    onClick={() => store.dispatch(setScheduleStep(this.props.step-1))}
			                    title="Alterar meio de pagamento" />
						: 	''
					}
					{
						this.props.step === 4
						?	<div>
			                    <BtnMain
				                    className="btn-block btn-outline font-weight-bold mb-2"
				                    title="Continuar comprando" />
			                    <BtnMain
				                    className="btn-block font-weight-bold"
				                    onClick={() => history.push('/', {active: 'service'})}
				                    title="Agendar serviços" />
		                    </div>
						: 	''
					}

					{
						this.props.step < 4
						? 	<BtnMain
			                    className="btn-block font-weight-bold"
			                    onClick={this.changeStep}
			                    title="Continuar" />
						: 	''
					}
                </div>
			</div>
		)
	}
}

const mapStateToProps = state =>
    ({
        user: {
            credits: state.user.credits,
            dollar_value: state.user.dollar_value,
        },
        schedule_cart: {
        	use_credits: state.schedule_cart.use_credits,
        	total: state.schedule_cart.total,
        	voucher: state.schedule_cart.voucher,
        	proffesional: state.schedule_cart.proffesional,
        	activeDate: state.schedule_cart.activeDate,
        	activeTime: state.schedule_cart.activeTime,
        },
        services: {
            salon: state.services.salon
        }
    })

export default connect(
    mapStateToProps
)(ScheduleCartTotal)