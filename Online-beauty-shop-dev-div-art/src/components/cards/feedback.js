import React, { Component } from 'react'
import { history } from 'store'
import Stars from 'components/stars'
import ImagePreview from 'components/images/preview'
import { getLang } from 'utils/lang'

class CardFeedback extends Component {

	goToVendor = () => {
		history.push(`/salon/${this.props.vendor.id}`)
	}

	render() {
		return (
			<div className="bg-white rounded p-3">
				<div className="row">
					<div className="col-lg-2 col-md-4 col-sm-6">
						<ImagePreview images={''} />
					</div>
					<div className="col-lg-6 col-md-8 col-sm-6">
						<div>Máscara Senscience Inner Restore Intensif 500ml</div>
						<div className="color-grey mb-3">
							{getLang('Vendido e realizado por')} <span className="color-green pointer" onClick={this.goToVendor}>{this.props.vendor.organization_name}</span>
						</div>
						<div className="row d-md-flex d-none">
							<div className="col-md-6">
								<div className="color-grey">{getLang('Data de compra')}:</div>
								<div>23/04/2018</div>
							</div>
							<div className="col-md-6">
								<div className="color-grey">{getLang('Data da avaliação')}:</div>
								<div>23/04/2018</div>
							</div>
						</div>
					</div>

					<div className="col-6 d-md-none">
						<div className="color-grey">{getLang('Data de compra')}:</div>
						<div>23/04/2018</div>
					</div>
					<div className="col-6 d-md-none mb-3">
						<div className="color-grey">{getLang('Data da avaliação')}:</div>
						<div>23/04/2018</div>
					</div>

					<div className="col-12">
						<div className="fs-16 d-inline-block">{this.props.reviewer.first_name}</div>
						<div className="color-grey d-inline-block pl-3">
							<Stars active={this.props.rating} />
						</div>
						<div className="color-grey">
							{this.props.comment} 
						</div>
					</div>
				</div>
				
			</div>
		)
	}
}

export default CardFeedback