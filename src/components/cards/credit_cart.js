import React, { Component } from 'react'
import store from 'store'
import Price from 'components/price'
import { removeFromCart } from 'actions/cart'
import { getLang } from 'utils/lang'

class CardCreditCart extends Component {
	
	removeFromCart = () => {
		store.dispatch(removeFromCart(this.props.id))
	}

    render() {
        return (
        	<div className="bg-white rounded p-3 mb-3 position-relative">
                <div className="row">
                    <div className="col-4">
                        <img src="/assets/images/credits.png" className="img-fluid" alt="" />
                    </div>
                    <div className="col-8">
                        <div className="color-grey">{getLang('Créditos')}: {this.props.credit_bundle.amount}</div>
                        <Price current={this.props.price} old={this.props.original_price} />
                    </div>
                </div>
                <i className="far fa-trash-alt fa-12x color-green pointer position-absolute right-15 top-15" onClick={this.removeFromCart}></i>
            </div>
        );
    }
}

export default CardCreditCart