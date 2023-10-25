import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { getWishlist } from 'actions/user'
import BtnGroup from 'components/buttons/btn_group'
import CardProduct from 'components/cards/product'
import CardService from 'components/cards/service'
import Pagination from 'components/pagination'

class Wishlist extends Component {
	state = {
		active: 'products',
		productsPage: 1,
		servicesPage: 1,
	}

	componentWillMount() {
		store.dispatch(getWishlist(this.state.active))
	}

	printList = (item, i) =>
		(<div key={i} className="col-lg-6 mb-3">
			{ this.state.active === 'products' ? <CardProduct {...item.product} wishlist={true} /> : <CardService {...item.service} wishlist={true} /> }
		</div>)

	toggleCat = item => e => {
		switch (item) {
			case 'services':
				this.setState({
					active: item
				})
				store.dispatch(getWishlist(item))
				break
			case 'products':
				this.setState({
					active: item
				})
				store.dispatch(getWishlist(item))
				break
			default: return
		}
	}

	changePage = type => page => {
		this.setState({[type]: page})
	}

	render() {
		const catButtons = [
    		{
				title: 'Produtos', 
				onClick: this.toggleCat('products'),
				active: this.state.active === 'products'
			}, {
				title: 'Serviços', 
				onClick: this.toggleCat('services'),
				active: this.state.active === 'services'
			}
		]

		const list = this.props.user.wishlist[this.state.active] || []
		const page = `${this.state.active}Page`
        return (
        	<div>
	    		<div className="row">
					<div className="col-lg-4 col-md-8 offset-md-2 offset-lg-4">
	        			<div className="text-center form-group">
				            <BtnGroup
				            	buttons={catButtons} />
		            	</div>
	            	</div>
	        	</div>
	        	<div className="row">
	        		{ list.slice((this.state[page] - 1) * 8, this.state[page] * 8).map((item, i) => this.printList(item, i)) }
	            </div>
	            {
	            	list.length > 8
	            	? 	<Pagination 
		                    onChange={this.changePage(page)} 
		                    total={Math.ceil(list.length / 8)} 
		                    active={this.state[page]} />
                    : 	null
	            }
	        </div>
    	)
    }
}

const mapStateToProps = state => 
	({
        user: {
        	wishlist:  state.user.wishlist
        }
    })

export default connect(
    mapStateToProps
)(Wishlist)