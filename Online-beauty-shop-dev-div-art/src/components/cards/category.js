import React, { Component } from 'react'
import { history } from 'store'
import './category.css'
import { getLang } from 'utils/lang'

class CategoryItem extends Component {
	goToCategory = () => {
		history.push(`category/${this.props.type}/${this.props.id}`)
	}

	render() {
		return (
			<div className="wrap-category-item pointer" onClick={this.goToCategory}>
				<div className="inner-category-item">
					<div style={{height: 100}}>
						<div className="category-item-icon mb-1">
							<img src={this.props.image_url} alt="" className="img-fluid" />
						</div>
						<strong>{getLang(this.props.name)}</strong>
					</div>
					<img className="category-arrow" src="assets/icons/icons8-right-50.png" alt="" />
				</div>
			</div>
		)
	}
}

export default CategoryItem