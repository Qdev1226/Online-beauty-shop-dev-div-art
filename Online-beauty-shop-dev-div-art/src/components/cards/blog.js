import React, { Component } from 'react'
import { getFullDate } from 'utils/date'
import { getLang } from 'utils/lang'

class CardBlog extends Component {
	getText = text => text.length > 80 ? `${text.slice(0,80)}...` : text

	render() {
		return (
				<div className="px-2">
					<div className="bg-white rounded">
						<img src={'/assets/images/blog.png'} alt="" className="img-fluid mb-1 rounded-top" />
						<div className="p-3">
							<div className="color-green mb-1">{getLang('Insights Hair style Yr retro brunch')}</div>
							<div className="fs-16 mb-1">{this.getText(getLang(this.props.body))}</div>
							<div className="color-grey">{this.props.author}</div>
							<div className="color-grey">{getFullDate(this.props.created_at)}</div>
						</div>
					</div>
				</div>
		)
	}
}

export default CardBlog