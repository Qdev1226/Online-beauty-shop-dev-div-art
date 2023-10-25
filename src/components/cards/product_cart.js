import React, { Component } from 'react'
import store from 'store'
import { Link } from 'react-router-dom'
import ImagePreview from 'components/images/preview'
import Counter from 'components/counter'
import Price from 'components/price'
import { setStep } from 'actions/cart'
import { removeFromCart, changeQuantity } from 'actions/cart'
import { getStepsCount } from 'utils'
import { getLang } from 'utils/lang'

class ProductCart extends Component {
	removeFromCart = e => {
		store.dispatch(removeFromCart(this.props.id))
	}

	changeQuantity = val => {
		store.dispatch(changeQuantity(this.props.id, val))
	}

    render() {
        return (
        	<div className="rounded bg-white p-2 mb-3 position-relative">
        		<div className="row">
		            <div className="col-4 pr-1">
		            	<ImagePreview images={this.props[this.props.type].images} />
		            </div>
		            <div className="col-8 pl-1 position-relative">
		            	<div className="mb-2 pr-4">{ this.props[this.props.type].name || this.props[this.props.type].title }</div>
	            		{
	            			this.props.type === 'service'
	            			? 	<div className="mb-2">
	            					<span className="color-grey">{getLang('Vendido e entregue por')} </span>
	            					<Link to={`salon/${this.props[this.props.type].id}`}>{this.props[this.props.type].vendor.organization_name}</Link>
	            					
	            				</div>
	            			: 	''
	            		}
		            	<div className="row justify-content-between">
	        				<div className="col-lg-6 col-sm-8 mb-2">
	        					<Counter onChange={val => this.changeQuantity(val)} value={this.props.quantity} />
	    					</div>
			            	<div className="col-lg-6 col-12 align-self-center text-lg-center">
	            				<Price current={this.props.total} />
			            	</div>
		            	</div>
		            </div>
	            </div>
	            <i className="far fa-trash-alt fa-12x color-green pointer position-absolute right-15 top-15" onClick={this.removeFromCart}></i>
			</div>
        );
    }
}

export default ProductCart