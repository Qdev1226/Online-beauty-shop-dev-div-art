import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { getCart, getCartTotal } from 'actions/cart'
import ProductCart from 'components/cards/product_cart'
import CardCreditCart from 'components/cards/credit_cart'
import CartTotal from 'components/cards/cart_total'
import Price from 'components/price'
import { getLang } from 'utils/lang'

class StepFirst extends Component {
	componentWillMount() {
		store.dispatch(getCart())
        store.dispatch(getCartTotal())
	}

	printList = (item, i) => <ProductCart key={i} {...item} />

    printBundle = (item, i) => <CardCreditCart key={i} {...item} />

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
        	<div className="row pb-5">
        		<div className="col-md-6">
                    <h4>{getLang('Meu carrinho')}</h4>
                    {
                        [...product, ...service, ...credit_bundle, ...promotion].length
                        ?   [...product, ...p_products, ...service, ...p_services].map((item, i) => this.printList(item, i))
                        :   <div className="rounded p-5 bg-white">{getLang('O seu carrinho está vazio')}</div>
                    }
                    {
                        credit_bundle.map((item, i) => this.printBundle(item, i))
                    }
        		</div>
        		<div className="col-md-6">
        			<h4>{getLang('Resumo do pedido')}</h4>
                    <CartTotal step={this.props.step} />
        		</div>
        	</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        cart: {
            list: state.cart.list,
        }
    })

export default connect(
    mapStateToProps
)(StepFirst)