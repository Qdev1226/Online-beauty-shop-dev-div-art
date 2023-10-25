import React, { Component } from 'react'
import store, { history } from 'store'
import { toggleModal } from 'actions/design'
import ImagePreview from 'components/images/preview'
import Price from 'components/price'
import BtnMain from 'components/buttons/btn_main'
import { SendVouchersForm } from 'components/forms'
import { format } from 'utils/mask'
import { getDate } from 'utils/date'
import moment from 'moment'
import { getLang } from 'utils/lang'

class CardVoucher extends Component {
	openSendVoucher = () => {
		store.dispatch(toggleModal(true, SendVouchersForm, 'modal-sm', '', {id: this.props.id, position: 'center'}))
	}

	addToScheduleCart = () => {
		history.push(`/schedule/${this.props.service.id}`, this.props.service)
	}

	getDays = () => moment(this.props.created_at).diff(moment(), 'days') + 1

	render() {
		const profName = this.props.proffesional && this.props.proffesional.id ? `${this.props.proffesional.user.first_name} ${this.props.proffesional.user.last_name}` : ''
		return (
			<div className="bg-white rounded p-3">
				<div className="d-flex">
					<div className="w-40">
						<ImagePreview images={''} />
					</div>
					<div className="w-60 pl-2">
						<div className="fs-16">{this.props.service.title}</div>
						<div className="color-grey mb-2">
							{getLang("Vendido e realizado por")} <br />
							<span className="color-green pointer">{this.props.service.vendor.organization_name}</span>
						</div>
						<Price current={this.props.service.price} />
					</div>
				</div>
				<div className="row mb-3">
					<div className="col-6">
						<div className="color-grey">
							{getLang('Profissional')}
						</div>
						<div>{profName}</div>
					</div>
					<div className="col-6">
						<div className="color-grey">
							{getLang('Agendamento')}
						</div>
						{
							this.props.created_at
							? 	<div>{getDate(this.props.created_at)} ({this.getDays()} dias)</div>
							: 	''
						}
					</div>
					<div className="col-6">
						<div className="color-grey">
							{getLang('Contato')}
						</div>
						<div>{format('phone', this.props.service.vendor.phone)}</div>
					</div>
					<div className="col-12">
						<div className="color-grey">
							{getLang('Local')}
						</div>
						<div>{`${this.props.service.vendor.address.title}, ${this.props.service.vendor.address.number}, ${this.props.service.vendor.address.street}`}</div>
					</div>
				</div>
				{ 	
					this.props.buttons
					? 	<div className="row justify-content-center">
							<div className="col-lg-10">
								<BtnMain
									title="Enviar para..."
									onClick={this.openSendVoucher}
									className="btn-block btn-outline" />
								<BtnMain
									title="Agendar"
									onClick={this.addToScheduleCart}
									className="btn-block" />
							</div>
						</div>
					: 	''
				}
			</div>
		)
	}
}

export default CardVoucher