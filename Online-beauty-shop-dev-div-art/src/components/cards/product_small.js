import React, { Component } from 'react'
import { history } from 'store'
import './product.css'
import Stars from 'components/stars'
import Price from 'components/price'
import BtnMain from 'components/buttons/btn_main.js'

class CardProductSmall extends Component {
	state = {
		display: 'block'
	}

	handleOnLoad = e => { this.setState({display: 'none'}) }

	goToProduct = e => history.push(`/product/${this.props.id}`)

	render() {

		//const image = this.props.images.length ? this.props.images[0].image_url : ''
		const image = ''
		return (
			<div className="card rounded p-2 pointer mb-3 d-flex" onClick={this.goToProduct}>
				<div className="d-flex">
					<div className="w-40">
		            	<div>
		            		<img className="rounded img-fluid" style={{display: this.state.display}} src='/assets/images/default-image-square.png' alt="" />
		            		<img onLoad={this.handleOnLoad} className="rounded img-fluid" src={image} alt="" />
		            	</div>
	            	</div>
	            	<div className="px-2 w-60">
		            	<div className="mb-2">
		            		<strong>{this.props.name}</strong>
		            	</div>
		            	<div className="mb-2">
		            		<strong>{this.props.description}</strong>
		            	</div>
		            	<div>
		            		<Price current={this.props.price} old={this.props.discount_price} />
		            	</div>
	            	</div>
            	</div>

            	<div className="color-grey d-flex justify-content-between align-items-center mb-2">
            		<div>
	            		Avaliação<br />
	            		<Stars active={this.props.rating} />
            		</div>
            		<i className="far fa-heart fs-22"></i>
            	</div>

            	<div className="row">
            		<div className="col-12 col-sm-6 pr-sm-1 mb-1">
	        			<BtnMain
	        				className="btn-outline font-weight-bold btn-block"
	        				title="Exibir servicos" />
    				</div>
    				<div className="col-12 col-sm-6 pl-sm-1 mb-1">
	    				<BtnMain
	        				className="font-weight-bold btn-block"
	        				title="Exibir servicos" />
    				</div>
        		</div>
			</div>
		)
	}
}

export default CardProductSmall