import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { getCart, removeFromCart } from 'actions/cart'
import BtnMain from 'components/buttons/btn_main'
import Price from 'components/price'
import ImagePreview from 'components/images/preview'
import { getLang } from 'utils/lang'

class CartHeader extends Component {
	state = {
		active: false
	}

	componentWillMount() {
		store.dispatch(getCart())
	}

	showAll = () => {
		this.setState({active: true})
	}
	
	removeFromCart = id => e => {
		e.stopPropagation()
		store.dispatch(removeFromCart(id))
	}

	getImage = item => {
		if (item.type === 'credit-bundle') {
			return [{image_url: '/assets/images/credits.png'}]
		}
		return ''
	}

	goToCart = () => {
		this.props.close()
		history.push('/cart')
	}

	printList = (item, i) => {
		if ((i < 3 && !this.state.active) || this.state.active) {
			const type = item[item.type.replace('-', '_')]
			const title = getLang(type.name) || getLang(type.title) || `${getLang('Créditos')}: ${type.amount}`
			const image = ''
			return 	<div key={i}>
						<div className="d-flex mb-1">
							<div className="w-15">
								<div className="position-relative d-flex h-100">
									<div className="mt-auto mb-auto">
										<ImagePreview image={this.getImage(item)} />
									</div>
									<span style={{top: -5, right: -5}} className="badge bg-green badge-pill text-white position-absolute py-1">{item.quantity}</span>
								</div>
							</div>
							<div className="w-85 px-2">
								<div className="d-flex">
									<div className="w-50">
										<span className="color-grey">{ title }</span>
									</div>
									<div className="w-50 text-right">
										<Price current={item.total} />
										<i className="far fa-trash-alt color-green pointer" onClick={this.removeFromCart(item.id)}></i>
									</div>
								</div>
							</div>
						</div>
					</div>
		}
	}

    render() {
    	const { product, service, credit_bundle, promotion } = this.props.cart.list
    	let p_products = []
        let p_services = []
        promotion.forEach(item => {
            item.promotion.products.forEach(i => {
                p_products.push({type: 'product', product: i, id: item.id, quantity: 1})
            })
            item.promotion.services.forEach(i => {
                p_services.push({type: 'service', service: i, id: item.id, quantity: 1})
            })
        })
        return (
        	<div>
	            { 	[...product, ...service, ...credit_bundle, ...promotion].length 
	            	? 	[...product, ...p_products, ...service, ...p_services, ...credit_bundle].map((item, i) => this.printList(item, i))
	            	: 	<div className="text-center mb-3">{getLang("Carrinho está vazio")}</div> 
            	}
            	{
            		[...product, ...service, ...credit_bundle, ...p_products, ...p_services].length > 3 && !this.state.active
            		? 	<div className="text-center mb-3 color-grey pointer" onClick={this.showAll}>&#9679;&#9679;&#9679;</div>
            		: 	<div className="text-center mb-3"></div>
            	}
            	{
            		[...product, ...service, ...credit_bundle, ...promotion].length
            		?	<div className="row justify-content-center">
		            		<div className="col-10">
					            <BtnMain
				                    className="btn-block btn-outline font-weight-bold"
				                    onClick={this.goToCart}
				                    title="Ir para o meu carrinho" />
		                    </div>
		                </div>
	                : 	''
            	}
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        cart: {
            list: state.cart.list
        }
    })

export default connect(
    mapStateToProps
)(CartHeader)