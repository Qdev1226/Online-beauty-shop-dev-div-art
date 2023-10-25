import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getCredits, getBundles } from 'actions/user'
import { toggleModal } from 'actions/design'
import Price from 'components/price'
import BtnMain from 'components/buttons/btn_main'
import Counter from 'components/counter'
import { SendCreditsForm } from 'components/forms'
import CardCredit from 'components/cards/credit'
import { getLang } from 'utils/lang'

class Credits extends Component {
	constructor() {
		super()
		this.state = {
			count: 0,
			creditsInCart: 0
		}
	}

	changeCount = count => {
		this.setState({count, creditsInCart: count / 7})
	}

	componentWillMount() {
		store.dispatch(getCredits())
		store.dispatch(getBundles())
	}

	openModal = () => {
		store.dispatch(toggleModal(true, SendCreditsForm, 'modal-md'))
	}

	printCreditsCard = (item, i) => <div key={i} className="col-xl-4 col-lg-6 mb-3"><CardCredit {...item} /></div>

	render() {
		return (
			<div>
				<div className="row align-items-stretch">
					<div className="col-lg-7">
						<h4>{getLang('Comprar créditos')}</h4>
						<div className="rounded border p-3 bg-white mb-3">
							<div className="row">
								<div className="col-sm-4 col-6 offset-3 offset-sm-0">
									<img src="/assets/images/credits.png" className="img-fluid" alt="" />
								</div>
								<div className="col-sm-8">
									<div className="fs-18">{getLang('Insira quantos créditos deseja comprar')}</div>
									<div className="color-grey mb-3 text-center text-sm-left">R$ 1,00 = 7,0 {getLang('Créditos')}</div>
									<div className="d-flex justify-content-center justify-content-sm-start">
										<Counter className="w-50" hideDescription step={7} value={this.state.count} onChange={this.changeCount} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-5 mb-3">
						<h4>{getLang('Resumo do pedido')}</h4>
						<div className="rounded border p-3 bg-white">
							<div className="d-flex justify-content-between">
								<span className="fs-18">{getLang('Créditos na loja:')}</span>
								<Price current={this.state.creditsInCart} />
							</div>
							<div className="d-flex justify-content-between color-grey mb-3">
								<span className="fs-18">{getLang('Total:')}</span>
								<Price current={this.props.user.credits / this.props.user.dollar_value} />
							</div>
							<BtnMain
		        				className="btn-block btn-outline font-weight-bold"
		        				onClick={this.addToCart}
		        				title="Adicionar ao carrinho" />
		    				<BtnMain
		        				className="btn-block font-weight-bold"
		        				title="Comprar agora" />
						</div>
					</div>
					<div className="col-lg-7 mb-3">
						<h4>{getLang('Enviar créditos')}</h4>
						<div className="rounded border p-3 bg-white">
							<div className="row mb-3">
								<div className="col-4">
									<img src="/assets/images/mobile-hand.png" className="img-fluid pl-md-2 pr-md-5" alt="" />
								</div>
								<div className="col-8">

									<div className="row mb-3">
										<div className="fs-18 col-12 col-sm-6 pr-0">{getLang('Créditos na loja:')}</div>
										<div className="col-sm-6 col-12 text-sm-right pl-sm-0">
											<Price current={this.props.user.credits / this.props.user.dollar_value} />
										</div>
									</div>

									<BtnMain
				        				className="btn-block btn-outline font-weight-bold d-none d-sm-block"
				        				onClick={this.openModal}
				        				title="Enviar para..." />
								</div>
							</div>
							<div className="d-sm-none">
								<BtnMain
			        				className="btn-block btn-outline font-weight-bold"
			        				onClick={this.openModal}
			        				title="Enviar para..." />
							</div>
						</div>
					</div>
					<div className="col-12">
						<h4>{getLang('Pacotes de créditos')}</h4>
						<div className="row">
							{ this.props.user.credits_bundles.map((item, i) => this.printCreditsCard(item, i)) }
						</div>
					</div>
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
        	credits_bundles: state.user.credits_bundles
        }
    })

export default connect(
    mapStateToProps
)(Credits)