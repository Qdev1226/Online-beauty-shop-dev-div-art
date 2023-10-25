import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { getAppointments } from 'actions/user'
import BtnMain from 'components/buttons/btn_main'
import CardAppointment from 'components/cards/appointment'
import { getLang } from 'utils/lang'

class Schedules extends Component {
	componentWillMount() {
		store.dispatch(getAppointments())
	}

	goToMain = () => {
		history.push('/', {active: 'service'})
	}

	printList = (item, i) => <div key={i} className="col-lg-6 mb-3"><CardAppointment {...item} /></div>

	render() {
		return (
			<div>
				{
					this.props.user.appointments.length
					? 	<div className="row align-items-strech">
							{ this.props.user.appointments.map((item, i) => this.printList(item, i)) }
						</div>
					: 	<div className="rounded bg-white border p-3 text-center">
							<div className="row justify-content-center mb-4">
								<div className="col-6 col-sm-4">
									<img src="/assets/images/book.png" alt="" className="img-fluid" />
								</div>
							</div>
							<div className="color-grey mb-4">
								{getLang('Você ainda não agendou um horário.')} 
								<br />
								{getLang('Que tal encontrar um novo estabelecimento?')}
							</div>
							<div className="row justify-content-center">
								<div className="col-sm-6">
									<BtnMain
				        				className="btn-block btn-outline font-weight-bold"
				        				onClick={this.goToMain}
				        				title="Vamos lá" />
		        				</div>
		    				</div>
						</div>
				}
			</div>
		)
	}
}

const mapStateToProps = state => 
	({
        user: {
        	appointments: state.user.appointments
        }
    })

export default connect(
    mapStateToProps
)(Schedules)