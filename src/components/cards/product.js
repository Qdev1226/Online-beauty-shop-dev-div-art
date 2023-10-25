import React, { Component } from 'react'
import store, { history } from 'store'
import './product.css'
import Stars from 'components/stars'
import Price from 'components/price'
import BtnMain from 'components/buttons/btn_main'
import { addToCart } from 'actions/cart'
import { addToWishList, removeFromWishList } from 'actions'
import Heart from 'components/heart'
import { getLang } from 'utils/lang'

class CardProduct extends Component {
	state = {
		display: 'block',
	}

	handleOnLoad = e => { this.setState({display: 'none'}) }

	goToProduct = e => history.push(`/product/${this.props.id}`)

	addToCart = now => e => {
		e.stopPropagation()
		store.dispatch(addToCart(this.props.id, 'product', {quantity: 1}))
		.then(res => {
			if (res && now) {
				history.push(`/cart`)
			}
		})
	}

	toggleWish = val => {
		val ? store.dispatch(addToWishList('product', this.props.id)) : store.dispatch(removeFromWishList('product', this.props.id))
	}

	removeFromWishList = e => {
		e.stopPropagation()
		store.dispatch(removeFromWishList('product', this.props.id))
	}

	render() {
		const image = this.props.images ? (this.props.images.length ? this.props.images[0].image_url : '') : ''
		const hiddenClass = history.location.pathname.indexOf('category') + 1 ? ' d-flex d-sm-flex d-md-none d-lg-flex' : ''
		const visibleCLass = history.location.pathname.indexOf('category') + 1 ? ' d-none d-sm-none d-md-flex d-lg-none' : ' d-none'
		return (
			<div className="card h-100 product rounded p-2 pointer d-flex flex-column justify-content-between" onClick={this.goToProduct}>
				<div className="d-flex mb-2">
					<div className="w-40">
		            	<div>
		            		<img className="rounded img-fluid" style={{display: this.state.display}} src='/assets/images/default-image-square.png' alt="" />
		            		<img onLoad={this.handleOnLoad} className="rounded img-fluid" src={image} alt="" />
		            	</div>
	            	</div>
	            	<div className="px-2 w-60">
		            	<div className="fs-16 line-clamp mb-1">
		            		{this.props.name}<br />
		            		{this.props.description}
		            	</div>
		            	<div className={`color-grey d-flex justify-content-between align-items-center mb-1${hiddenClass}`}>
		            		<div>
			            		{getLang('Avaliação')}<br />
			            		<Stars active={this.props.rating} />
		            		</div>
		            		{
		            			this.props.wishlist
		            			? 	<i className={`fas fa-heart fs-22 pointer color-green`} onClick={this.removeFromWishList}></i>
		            			: 	<Heart onChange={this.toggleWish} active={this.props.in_wishlist} />
		            		}
		            	</div>
	            		<Price current={this.props.price} old={this.props.discount_price} />
	            	</div>
            	</div>
            	<div className={`color-grey justify-content-between align-items-center mb-3${visibleCLass}`}>
            		<div>
									{getLang('Avaliação')}<br />
	            		<Stars active={this.props.rating} />
            		</div>
            		{
            			this.props.wishlist
            			? 	<i className={`fas fa-heart fs-22 pointer color-green`} onClick={this.removeFromWishList}></i>
            			: 	<Heart onChange={this.toggleWish} active={this.props.in_wishlist} />
            		}
            	</div>
            	<div className="row justify-content-between">
            		<div className="col-xl-6 pr-xl-1 mb-2 md-sm-0">
            			<BtnMain
	        				className="btn-block font-weight-bold"
	        				onClick={this.addToCart(true)}
	        				title="Comprar agora" />
            		</div>
        			<div className="col-xl-6 pl-xl-1">
	    				<BtnMain
	        				className="btn-block btn-outline font-weight-bold px-1"
	        				onClick={this.addToCart(false)}
	        				title="Adicionar ao carrinho" />
    				</div>
        		</div>
			</div>
		)
	}
}

export default CardProduct