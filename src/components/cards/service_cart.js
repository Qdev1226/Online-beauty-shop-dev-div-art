import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { toggleModal, updateModal } from 'actions/design'
import { setProffesional } from 'actions/schedule_cart'
import Price from 'components/price'
import moment from 'moment'
import RadioSwitch from 'components/inputs/radio_switch'
import BtnMain from 'components/buttons/btn_main'
import { getLang } from 'utils/lang'

class ServiceCart extends Component {
	state = {
		activeProfessional: 0,
		proffesional: {
			user: {}
		}
	}

	getDuration = () => {
		let temp = ''
		for (let k in moment.duration(this.props.duration)._data) {
			if (moment.duration(this.props.duration)._data[k]) {
				temp += `${moment.duration(this.props.duration)._data[k]} ${k} `
			}
		}
		return temp
	}

	toggleProfessional = onCancel => activeProfessional => {
		store.dispatch(updateModal(activeProfessional))
		const prof = this.props.schedule_cart.professionals.find(item => item.professional.id === activeProfessional)
		store.dispatch(setProffesional(prof))
		onCancel()
	}

	fakeSwitch = (onCancel, id) => e => {
		this.toggleProfessional(onCancel)(id)
	}

	professionalsList = props => {
	    return (
	        <div className="pt-3">
	        	<div className="mb-2">
		            {this.props.schedule_cart.professionals.map((item, i) => {
		            	const professional = item.professional.user
		            	const lastClass = this.props.schedule_cart.professionals.length === i + 1 ? '' : ' border-bottom'
		            	return 	<div key={i} className={`d-flex justify-content-start align-items-center pointer py-2${lastClass}`} onClick={this.fakeSwitch(props.onCancel, item.professional.id)}>
					                <div className="pr-3 w-20"><img src="/assets/images/default-professional.png" alt="" className="img-fluid" /></div>
					                <div>{professional.first_name} {professional.last_name}</div>
					                <div className="ml-auto">
					                	<RadioSwitch
					                		style={{transform: 'scale(0.73, 0.7)'}} 
			                                onChange={this.toggleProfessional(props.onCancel)}
			                                value={item.professional.id}
			                                checked={this.props.schedule_cart.proffesional.professional.id} />
					                </div>
					            </div>
		            })}
	            </div>
	            <BtnMain 
	            	className="btn-outline btn-block"
	            	onClick={props.onCancel}
	            	title="Cancelar" />
	        </div>
	    )
	}

	openProfessionals = () => {
		store.dispatch(toggleModal(true, this.professionalsList, 'modal-sm', 'Profissionais'))
	}

    render() {
    	const { salon } = this.props
    	const { professional } = this.props.schedule_cart.proffesional
    	const textButton = this.props.schedule_cart.proffesional.professional.id ? 'Alterar' : 'Selecione um profissional'
        return (
        	<div className="bg-white px-3 py-3 rounded">
	            <div className="fs-16 mb-3">
	            	{this.props.title}
            	</div>
            	<Price current={this.props.price} />
	            <div className="color-grey mb-2">{ this.getDuration() }</div>
	            <div className="border-bottom mb-2  mr--3 ml--3"></div>
	            {
	            	this.props.schedule_cart.professionals.length
	            	? 	<div className="d-flex justify-content-between mb-2">
			            	{
			            		professional.id !== false
			            		? 	<div className="color-grey">{`com ${professional.user.first_name} ${professional.user.first_name}`}</div>
			            		: 	''
			            	}
		            		<div className="pointer color-green align-self-end" onClick={this.openProfessionals}>{getLang(textButton)}</div>
	            		</div>
	            	: 	''
	            }
	            <div className="border-bottom mb-2 mr--3 ml--3"></div>
            	<div className="color-grey">{`${salon.address.title}, ${salon.address.number} ${salon.address.street}`}</div>
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        schedule_cart: {
        	proffesional: state.schedule_cart.proffesional,
        	professionals: state.schedule_cart.professionals,
        }
    })

export default connect(
    mapStateToProps
)(ServiceCart)