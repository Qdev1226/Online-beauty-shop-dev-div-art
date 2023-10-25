import React, { Component } from 'react'
import store from 'store'
import { setAlert } from 'actions/design'
import StepsRound from 'components/steps/steps_round'
import Price from 'components/price'
import { getLang } from 'utils/lang'

class PurchasePage extends Component {

	getDeliveryStatus = status => {
		switch(status) {
			case 'none': return 1;
			case 'pending': return 2;
			case 'posted': return 3;
			case 'finished': return 4;
			default: return 1;
		}
	}

	copy = () => {
		const value = this.trackCode.textContent
		const el = document.createElement('textarea');
	  	el.value = value;
	  	document.body.appendChild(el);
	  	el.select();
	  	document.execCommand('copy');
	  	document.body.removeChild(el);
	  	store.dispatch(setAlert(getLang('Copiado'), 'success'))
	}

    render() {
    	const purchase = this.props.purchase ? this.props.purchase : {}
        return (
        	<div>
        		<div className="mb-3">
	            	<StepsRound active={this.getDeliveryStatus(purchase.delivery_status)} />
	            </div>
	            <div className="row">
	            	<div className="col-sm-6">
	            		<div className="rounded bg-white border p-3">
	            			<h4 className="mb-3">{getLang('Valores')}</h4>
	            			<div className="border-bottom mb-3"></div>

	            			<div className="d-flex justify-content-between color-grey mb-2">
	            				<div className="fs-18">{getLang('Subtotal')}:</div>
								<div className="text-left">
									<Price current={purchase.items_total} />
								</div>
							</div>

							<div className="d-flex justify-content-between color-grey mb-2">
	            				<div className="fs-18">{getLang('Frete')}:</div>
								<div className="text-left">
									<Price current={purchase.delivery_tax} />
								</div>
							</div>

							<div className="d-flex justify-content-between mb-2">
	            				<div className="fs-18">{getLang('Total')}:</div>
								<div className="text-left">
									<Price current={purchase.total} />
								</div>
							</div>
							<div className="border-bottom mb-3"></div>
							<div className="d-flex justify-content-between align-items-center mb-2">
								<div className="color-grey">
									<div>{getLang('Código de rastreio:')}</div>
									<div ref={ref => this.trackCode = ref}>7879879879877987987987987987987978987</div>
								</div>
								<div><span className="color-green pointer" onClick={this.copy}>{getLang('Copiar')}</span></div>
							</div>

	            		</div>
	            	</div>
	            	<div className="col-sm-6">
	            		<div className="rounded bg-white border p-3">
	            			<h4 className="mb-3">{getLang('Endereço de entrega')}</h4>
	            			<div className="border-bottom mb-3"></div>
	            		</div>
	            	</div>
	            </div>
			</div>
        );
    }
}

export default PurchasePage