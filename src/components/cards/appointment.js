import React, { Component } from 'react'
import store from 'store'
import { cancelAppointment } from 'actions'
import { getAppointments } from 'actions/user'
import Price from 'components/price'
import BtnMain from 'components/buttons/btn_main'
import ImagePreview from 'components/images/preview'
import { Link } from 'react-router-dom'
import { toggleModal } from 'actions/design'
import { getLang } from 'utils/lang'
import { getDate, getFullTime } from 'utils/date'
import { format } from 'utils/mask'
import moment from 'moment'

class CardAppointment extends Component {
	cancel = () => {
		store.dispatch(toggleModal(true, this.confirmCancel, 'modal-sm text-center', 'Cancelar agendamento', {position: 'center'}))
	}

    cancelAppointment = cancelFunc => {
        store.dispatch(cancelAppointment(this.props.id))
        .then(res => {
            if (res) {
                store.dispatch(getAppointments())
                cancelFunc()
            }
        })
    }

    getDays = () => moment(this.props.start).diff(moment(), 'days') + 1

	confirmCancel = props => {
		return  <div className="text-center">
                    <div className="mb-3">{getLang('Após o cancelamento o valor será convertido em créditos e você perderá 15% do valor.')}</div>
                    <div className="mb-3 color-red">{getLang('Está operação não pode ser revertida')}</div>
                    <BtnMain
                        className="btn-block font-weight-bold btn-outline"
                        onClick={() => props.onCancel()}
                        title="Não cancelar" />
                    <BtnMain
                        className="btn-block font-weight-bold"
                        onClick={() => this.cancelAppointment(props.onCancel)}
                        title="Cancelar" />
                </div>
	}

    render() {
        return (
        	<div className="rounded bg-white border p-2 mb-3 h-100">
	            <div className="row">
	            	<div className="col-sm-5">
	            		<ImagePreview images={''} />
            		</div>
            		<div className="col-sm-7">
            			<div className="d-flex align-items-start flex-column h-100">
            				<div>
		            			<div>{this.props.voucher.service.title}</div>
		        				<span className="color-grey">{getLang('Vendido e realizado por')}</span><br />
		        				<Link to={`salon/${this.props.voucher.vendor.id}`} className="color-green">{this.props.voucher.vendor.organization_name}</Link>
	        				</div>
	        				<div className="mt-auto mb-4">
	        					<Price current={this.props.voucher.service.price} />
        					</div>
        				</div>
            		</div>
            	</div>
            	<div className="row mb-2">
            		<div className="col-md-6 mb-2">
            			<div className="color-grey">{getLang('Profissional')}:</div>
            			<div>{this.props.professional.user.first_name} {this.props.professional.user.last_name}</div>
            		</div>
            		<div className="col-md-6">
            			<div className="color-grey">{getLang('Agendamento')}:</div>
            			<div>{getDate(this.props.start)} às {getFullTime(this.props.start)}</div>
            		</div>
            	</div>
            	<div className="border-bottom mb-2"></div>
            	<div className="color-grey">{getLang('Contato')}:</div>
            	<div className="mb-2">{format('phone', this.props.voucher.vendor.phone)}</div>
            	<div className="color-grey">{getLang('Local')}:</div>
            	<div className="mb-2">{this.props.voucher.vendor.address.title}, {this.props.voucher.vendor.address.number} {this.props.voucher.vendor.address.street}</div>
            	<div className="color-grey">E-mail:</div>
            	<div className="mb-2">{this.props.voucher.vendor.user_email}</div>

            	<div className="row mb-2">
            		<div className="col-sm-6">
            			<div className="color-grey">{getLang('Validade')}:</div>
            			<div>{getDate(this.props.start)} às {getFullTime(this.props.start)}</div>
            			<sup className="color-grey">({this.getDays()} {getLang('dias')})</sup>
            		</div>
            		<div className="col-sm-6">
            			<div className="color-grey">ID:</div>
            			<div>#{this.props.id}</div>
            		</div>
            	</div>

            	<div>
	            	<BtnMain
        				className="btn-block font-weight-bold btn-outline"
        				onClick={this.cancel}
        				title="Cancelar agendamento" />
				</div>
			</div>
        );
    }
}

export default CardAppointment