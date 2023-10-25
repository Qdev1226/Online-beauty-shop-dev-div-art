import React, { Component } from 'react'
import store, { history } from 'store'
import { addToCart } from 'actions/cart'
import { addToWishList, removeFromWishList } from 'actions'
import Stars from 'components/stars'
import Price from 'components/price'
import BtnMain from 'components/buttons/btn_main'
import { getDistance } from 'utils'
import Heart from 'components/heart'
import Tag from 'components/tags'
import './service.css'
import { getLang } from 'utils/lang'

class CardService extends Component {
	state = {
		active: false,
		range: '0.0 km'
	}

	toggleCard = e => {
		e.stopPropagation()
		if (this.state.active && document.body.clientWidth > 768) {
			history.push(`/salon/${this.props.id}`)
		}

		this.setState({
			active: !this.state.active
		})
	}

	setCardTrue = active => e => {
		e.stopPropagation()
		if (document.body.clientWidth > 768) {
			this.setState({active})
		}
	}

	setCardFalse = active => e => {
		e.stopPropagation()
		this.setState({active})
	}

	addToCart = e => {
		e.stopPropagation()
		store.dispatch(addToCart(this.props.id, 'service', {quantity: 1}))
	}

	getAddress = address => {
		return `${address.title}, ${address.street}, ${address.city} - ${address.state}, ${address.zipcode}`
	}

	getDistance = () => {
		let range = false
		const address = this.props.vendor.address || this.props.address
		navigator.geolocation.getCurrentPosition(pos => {
			range = getDistance(pos.coords.latitude, pos.coords.longitude, address.latitude, address.longitude)
			if (this.mount && range) {
				this.setState({
					range: range
				})
			}
		})
	}

	addToScheduleCart = e => {
		e.stopPropagation()
		history.push(`/schedule/${this.props.id}`, this.props)
	}

	goToSalon = e => {
		e.stopPropagation()
		history.push(`/salon/${this.props.id}`)
	}

	toggleWish = val => {
		val ? store.dispatch(addToWishList('service', this.props.id)) : store.dispatch(removeFromWishList('service', this.props.id))
	}

	removeFromWishList = e => {
		e.stopPropagation()
		store.dispatch(removeFromWishList('service', this.props.id))
	}

	componentDidMount() {
		this.getDistance()
		this.mount = true
	}

	componentWillUnmount() {
		this.mount = false
	}

    render() {
    	const activeClass = this.state.active ? ' active' : ''
        return (
	        	<div
	        		className={`card rounded pointer h-100 service-card position-relative${activeClass}`} 
	        		onMouseEnter={this.setCardTrue(true)}
	        		onMouseLeave={this.setCardFalse(false)}
	        		onClick={this.toggleCard}>
	        		<div className="d-flex align-items-end flex-column h-100 py-2 px-2">
		        		<div>
			            	<div className="position-relative mb-3">
			            		<img className="rounded img-fluid" src="/assets/images/default-image.png" alt="" />
			            		<div className="range-stripe">
			            			{this.state.range}
			            		</div>
			            	</div>
			            	<div className="mb-2">
			            		<span>{this.props.title}</span>
			            	</div>

			            	<div className="color-grey d-flex justify-content-between align-items-center mb-2">
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

			            	<div className="mb-2">
			            		<Price current={this.props.price} old={this.props.discount_price} />
			            	</div>
	            		</div>
	            		
            		</div>
            		<div className="position-relative z-index-1 w-100 wrap-service-hidden-block">
	            		<div className="service-hiiden-block position-absolute bg-white px-2 border-top-0 rounded-bottom">
	            			<div className="mb-1">
			            		<strong>{this.props.vendor.organization_name}</strong>
		            		</div>
		            		<div className="color-grey w-75 mb-3">
		            			{this.getAddress(this.props.vendor.address || this.props.address)}
		            		</div>
		            		<div className="mb-2">
		            			<Tag title={this.props.category.name} catId={this.props.category.id} />
		            		</div>
	            			<div className="row justify-content-between mb-1">
	            				<div className="col-xl-6 pr-xl-1 mb-1 md-sm-0">
			            			<BtnMain
			            				className="btn-block btn-outline font-weight-bold"
			            				onClick={this.addToScheduleCart}
			            				title="Agendar agora" />
	            				</div>
	            				<div className="col-xl-6 pl-xl-1">
			        				<BtnMain
			        					className="btn-block btn-outline font-weight-bold px-1"
			        					onClick={this.goToSalon}
			        					title="Exibir servicos" />
	            				</div>
	        				</div>
	            			<BtnMain
	            				className="btn-block font-weight-bold"
	            				onClick={this.addToCart}
	            				title="Adicionar ao carrinho" />
	            		</div>
            		</div>
				</div>
        );
    }
}

export default CardService