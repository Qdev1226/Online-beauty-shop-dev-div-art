import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { setStep, setUseCredits, cartPurchase } from 'actions/cart'
import BtnMain from 'components/buttons/btn_main'
import Price from 'components/price'
import CheckBox from 'components/inputs/checkbox'
import { card_types } from 'config'
import { getLang } from 'utils/lang'

class CartTotal extends Component {
	changeStep = last => e => {
		if (this.props.step === last - 1 || (this.props.step === 4 && last === 4)) {
			const method = this.props.cart.use_credits ? 'credits' : 'cielo'
			const card = this.props.user.guest ? this.props.cart.guestCard : this.props.user.default_card
			const card_brand = card_types.find(item => item.pattern.test(card.card_number)) ? card_types.find(item => item.pattern.test(card.card_number)).name : ''
			const data = {
				first_name: this.props.user.data.first_name,
				last_name: this.props.user.data.last_name,
				card_number: card.card_number,
				expiry_month: card.validity_month,
				expiry_year: card.validity_year,
				cvv: card.cvv,
				card_brand: card_brand,
				credits_to_use: this.props.user.credits
			}

			store.dispatch(cartPurchase(method, data))
			.then(res => {
				if (res) {
					store.dispatch(setStep(this.props.step+1))
				}
			})
			return
		}

		if (this.props.step < last) {
			store.dispatch(setStep(this.props.step+1))
		}

		if (this.props.step === last) {
			history.push('/')
		}
	}

	setUseCredits = e => {
		store.dispatch(setUseCredits(e.target.checked))
	}

	getTotal = () => {
        return this.props.cart.use_credits ? this.props.cart.total.total - this.props.user.credits / this.props.user.dollar_value : this.props.cart.total.total
    }

    getUseCredits = () => {
    	return this.props.cart.use_credits ? this.props.user.credits / this.props.user.dollar_value : 0
    }

	render() {
	 	const {  main_address } = this.props.user.data
        const { guestAddress } = this.props.cart
		const lastStep = this.props.cart.list.service.length ? 4 : 5

		return (
			<div className="rounded bg-white p-4">
				{
					this.props.step === lastStep - 1 && lastStep === 5
					?	
						!this.props.user.guest
                        ? 	<div className="fs-18 color-grey border-bottom mb-3">
                        		<div className="d-flex justify-content-between">
                        			<div>{getLang('Nome de endereço')}:</div>
	                            	<div>{main_address.title}</div>
                            	</div>
                            	<div className="d-flex justify-content-between">
                            		<div>{getLang('CEP')}:</div>
	                            	<div className="color-grey">{main_address.zipcode}</div>
                            	</div>
							</div>
                        : 	Object.keys(guestAddress).length
	                        ?	<div className="color-grey border-bottom mb-3">
		                            <div className="color-grey">{guestAddress.title}</div>
		                            <div className="color-grey">{getLang('CEP')}: {guestAddress.zipcode}</div>
								</div>
	                        : 	''
						
					: 	''
				}{
					this.props.step !== 3
					? 	<div className="d-flex justify-content-between color-grey">
							<div><h5>{getLang('Subtotal')}:</h5></div>
							<div><Price current={this.props.cart.total.products} /></div>
						</div>
					: 	<div>
							<h5>{getLang('Usar créditos')}</h5>
							<div className="d-flex justify-content-between color-grey">
								<div><Price className="d-inline-block" current={this.props.user.credits / this.props.user.dollar_value} /> {getLang('créditos')}</div>
								<div><CheckBox value={this.props.cart.use_credits} onChange={this.setUseCredits} /></div>
							</div>
						</div>
				}{
					this.props.step === 2 || this.props.step === 4 || this.props.step === 5
					? 	<div className="d-flex justify-content-between color-grey">
							<div><h5>{getLang('Frete')}:</h5></div>
							<div><Price current={this.props.cart.total.delivery} /></div>
						</div>
					: 	''
				}{
					this.props.step === 4 || this.props.step === 5
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
						this.props.step === lastStep - 1
						? 	<div>
								<BtnMain
				                    className="btn-block btn-outline font-weight-bold mb-2"
				                    onClick={() => store.dispatch(setStep(this.props.step-1))}
				                    title="Alterar meio de pagamento" />
				                    {
				                    	lastStep === 5
				                    	? 	<BtnMain
							                    className="btn-block btn-outline font-weight-bold mb-2"
							                    onClick={() => store.dispatch(setStep(this.props.step-2))}
							                    title="Alterar endereço" />
				                    	: 	''
				                    }
		                    </div>
						: 	''
					}{
						this.props.step === lastStep
						?	<div>
								<BtnMain
				                    className="btn-block btn-outline font-weight-bold"
				                    onClick={() => history.push('/vouchers')}
				                    title="Agendar serviços" />
			                    <BtnMain
				                    className="btn-block btn-outline font-weight-bold mb-2"
				                    onClick={() => history.push('/purchased')}
				                    title="Acompanhar produtos" />
		                    </div>
						: 	''
					}
					<BtnMain
	                    className="btn-block font-weight-bold"
	                    onClick={this.changeStep(lastStep)}
	                    title={this.props.step === lastStep ? 'Continuar comprando' : 'Continuar'} />
                </div>
			</div>
		)
	}
}

const mapStateToProps = state =>
    ({
        user: {
            data: {
            	credit_amount: state.user.data.credit_amount,
            	main_address: state.user.data.main_address,
            	first_name: state.user.data.first_name,
            	last_name: state.user.data.last_name,
            },
            guest: state.user.guest,
            credits: state.user.credits,
            dollar_value: state.user.dollar_value,
            default_card: state.user.default_card
        },
        cart: {
        	list: state.cart.list,
        	guestAddress: state.cart.guestAddress,
        	guestCard: state.cart.guestCard,
        	use_credits: state.cart.use_credits,
        	total: state.cart.total,
        }
    })

export default connect(
    mapStateToProps
)(CartTotal)