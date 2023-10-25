import React, { Component } from 'react'
import SupportAccordion from 'components/accordion/support'
import { SupportForm } from 'components/forms'
import { getLang } from 'utils/lang'

class Support extends Component {
	state = {
		active: false
	}

	getAddress = () => {
		return 	<div>
					<div className="row">
                    	<div className="col-lg-10 offset-lg-1">
							<div className="color-grey">
								{getLang('Grande São Paulo')}
							</div>
							<div className="mb-3">
								(11) 3065-7200
							</div>
							<div className="color-grey">
								{getLang('Outras Localidades')}
							</div>
							<div className="mb-3">
								0800-754-4000
							</div>
							<div className="color-grey">
								{getLang('Horário de atendimento das 8h às 20h, de segunda a sábado (exceto feriados)')}
							</div>
						</div>
					</div>
				</div>
	}

	showSupport = () => {
		this.setState({active: !this.state.active})
	}

	render() {
		const text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip'
		const mainList = [
			{
				title: 'Atendimento por email',
				img: '/assets/icons/support-letter.png',
				body: <SupportForm />
			}, {
				title: 'Atendimento por telefone',
				img: '/assets/icons/support-phone.png',
				body: this.getAddress()
			}
		]
		const list = [
			{
				title: getLang('Quando recebo meu pedido'),
				body: <div className="px-3 px-sm-0 px-md-3 color-grey">{getLang(text)}</div>
			}, {
				title: getLang('Quem paga o frete de retorno'),
				body: <div className="px-3 px-sm-0 px-md-3 color-grey">{getLang(text)}</div>
			}, {
				title: getLang('Quando receberá o meu reembolso'),
				body: <div className="px-3 px-sm-0 px-md-3 color-grey">{getLang(text)}</div>
			}, {
				title: getLang('E se eu perdesse o prazo de agendamento'),
				body: <div className="px-3 px-sm-0 px-md-3 color-grey">{getLang(text)}</div>
			}
		]

		return (
			this.state.active
			? 	<SupportAccordion list={list} />
			: 	<div>
					<div className="p-3 position-relative bg-white border rounded mb-2 pointer" onClick={this.showSupport}>
						<div className="d-inline-block footer-icon d-sm-none d-md-inline-block">
							<img src="/assets/icons/support-setting.png" className="img-fluid" alt="" />
						</div>
	                    <div className="fs-18 support-title d-inline-block pl-3 pl-sm-0 pl-md-3">{getLang('Perguntas frequentes')}</div>
	                    <div className="accordion-right-arrow"></div>
					</div>
					<SupportAccordion list={mainList} />
				</div>
		)
	}
}

export default Support