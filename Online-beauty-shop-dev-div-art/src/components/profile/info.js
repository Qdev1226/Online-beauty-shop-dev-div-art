import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import BtnMain from 'components/buttons/btn_main'
import Avatar from 'components/images/avatar'
import { getCreditCards } from 'actions/user'
import { getLang } from 'utils/lang'

class Info extends Component {
	goToEdit = type => e => {
		history.push(`profile${type}/edit`)
	}

	gotoAddress = url => e => {
		history.push('profile/address' + url)
	}

	goToCards = url => e => {
		history.push('profile/cards' + url)
	}

	componentWillMount() {
		store.dispatch(getCreditCards())
	}

	getCardNumber = num => `****.****.****.${num.slice(-4)}`

    render() {
    	const { first_name, last_name, email } = this.props.user.data
    	const image_url = this.props.user.data.user_image.image_url
    	const address = this.props.user.data.main_address ? this.props.user.data.main_address : this.props.user.data.address
    	const { default_card } = this.props.user
        return (
        	<div className="row">
	        	<div className="col-12 mb-3">
	        		<div className="rounded px-4 pt-4 pb-2 bg-white border">
						<h4 className="mb-3">{getLang('Meus Dados')}</h4>
						<div className="border-bottom mb-4"></div>
						<div className="row align-items-center mb-3">
		    				<div className="color-grey col-lg-10 col-8">
		    					<h4>{`${first_name} ${last_name}`}</h4>
		    					<h4 className="mb-3">{email}</h4>
		    					<div className="row">
									<div className="col-12 col-lg-4 col-md-8 mb-2">
										<BtnMain
					        				className="font-weight-bold btn-block"
					        				onClick={this.goToEdit('')}
					        				title="Editar" />
			        				</div>
			        				<div className="col-12 col-lg-4 col-md-8">
				        				<BtnMain
					        				className="font-weight-bold btn-block"
					        				onClick={this.goToEdit('/password')}
					        				title="Alterar senha" />
									</div>
								</div>
		    				</div>
		    				<div className="col-lg-2 col-4 align-self-end align-self-lg-center">
								<Avatar image={image_url} edit={true} />
							</div>
						</div>
						
					</div>
				</div>
				<div className="col-lg-6 col-md-8 mb-3">
					<div className="rounded p-4 bg-white border">
						<h4 className="mb-3">{getLang('Endereço de entrega')}</h4>
						<div className="border-bottom mb-4"></div>
						<div className="color-grey mb-3 fs-18">
							{address.title}<br />
							{address.street}
						</div>
						<div>
							<BtnMain
		        				className="font-weight-bold btn-outline btn-block"
		        				onClick={this.gotoAddress('/add')}
		        				title="Adicionar endereço" />
	        				<BtnMain
		        				className="font-weight-bold btn-block"
		        				onClick={this.gotoAddress('/')}
		        				title="Editar" />
						</div>
					</div>
				</div>

				<div className="col-12"></div>

				<div className="col-lg-6 col-md-8">
					<div className="rounded p-4 bg-white border">
						<h4 className="mb-3">{getLang('Meu cartão')}</h4>
						<div className="border-bottom mb-3"></div>
						{
							Object.keys(default_card).length
							? 	<div className="fs-18">
									<div className="color-grey">{this.getCardNumber(default_card.card_number)}</div>
                        			<div className="color-grey mb-3">Visa</div>
                    			</div>
							: 	''
						}
						
						<div>
							<BtnMain
		        				className="font-weight-bold btn-outline btn-block"
		        				onClick={this.goToCards('/add')}
		        				title="Adicionar cartão" />
	        				<BtnMain
		        				className="font-weight-bold btn-block"
		        				onClick={this.goToCards('/')}
		        				title="Editar" />
						</div>
					</div>
				</div>
			</div>
		);
    }
}

const mapStateToProps = state => 
	({
        user: {
        	data: {
        		first_name: state.user.data.first_name,
        		last_name: state.user.data.last_name,
        		email: state.user.data.email,
        		main_address: state.user.data.main_address,
        		address: state.user.data.address,
        		user_image: {
        			image_url: state.user.data.user_image.image_url,
        		}
        	},
        	default_card: state.user.default_card
        }
    })

export default connect(
    mapStateToProps
)(Info)