import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getReviewsProduct, getReviewsVendor } from 'actions/user'
import CardReview from 'components/cards/review'
import CardFeedback from 'components/cards/feedback'
import { getLang } from 'utils/lang'
import Pagination from 'components/pagination'

class Feedback extends Component {
	state = {
		pageProduct: 1,
		pageVendor: 1
	}

	componentWillMount() {
		store.dispatch(getReviewsProduct())
		store.dispatch(getReviewsVendor())
	}
	printReviews = (item, i) => {
		return 	<div key={i} className="col-lg-6 mb-3">
					<CardReview {...item} />
				</div>
	}

	printFeedbacks = (item, i) => {
		return 	<div key={i} className="mb-3">
					<CardFeedback {...item} />
				</div>
	}

	changePage = type => page => {
		this.setState({[type]: page})
	}

	render() {
		return (
			<div>
				<h4 className="mb-3">{getLang('Revisão')}</h4>
				{
					this.props.user.reviews_product.length
					?	<div className="row">
							{ this.props.user.reviews_product.slice((this.state.pageProduct - 1) * 8, this.state.pageProduct * 8).map((item, i) => this.printReviews(item, i)) }
						</div>
					: 	<div className="rounded bg-white p-4 mb-4">
							{getLang('Você ainda não fez nenhuma revisão')}
						</div>
				}
				{
					this.props.user.reviews_product.length > 8
	            	? 	<Pagination 
		                    onChange={this.changePage('pageProduct')} 
		                    total={Math.ceil(this.props.user.reviews_product.length / 8)} 
		                    active={this.state.pageProduct} />
                    : 	null
				}
				<h4 className="mb-3">{getLang('Feedback')}</h4>
				{
					this.props.user.reviews_vendor.length
					? 	this.props.user.reviews_vendor.slice((this.state.pageVendor - 1) * 8, this.state.pageVendor * 8).map((item, i) => this.printFeedbacks(item, i))
					: 	<div className="rounded bg-white p-4 mb-4">
							{getLang('Você ainda não fez nenhuma revisão')}
						</div>
				}
				{
					this.props.user.reviews_vendor.length > 8
	            	? 	<Pagination 
		                    onChange={this.changePage('pageVendor')} 
		                    total={Math.ceil(this.props.user.reviews_vendor.length / 8)} 
		                    active={this.state.pageVendor} />
                    : 	null
				}
			</div>
		)
	}
}

const mapStateToProps = state => 
	({
        user: {
        	reviews_product: state.user.reviews_product,
			reviews_vendor: state.user.reviews_vendor,
        }
    })

export default connect(
    mapStateToProps
)(Feedback)