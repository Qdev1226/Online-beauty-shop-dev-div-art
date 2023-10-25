import React, { Component } from 'react'
import store, { history } from 'store'
import { loadOrder } from 'actions/user'
import Price from 'components/price'
import { getDate } from 'utils/date.js'
import BtnMain from 'components/buttons/btn_main.js'
import { getLang } from 'utils/lang'

class CardPurchase extends Component {
	printList = (item, i) => {
		const key = item.product ? 'product' : 'service'
		const name = item[key].name || item[key].title
		return <div key={i}>{name}</div>
	}

	goDetails = () => {
		history.push(`purchased/${this.props.id}`)
	}

	loadOrder = () => {
		
		const [last, ...other] = this.props.receipts[0].receipt.split('/').reverse()
		store.dispatch(loadOrder(this.props.receipts[0].receipt))
		.then(blob => {
			const data = window.URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = data
			link.download = last
			link.click()
			setTimeout(() => {
				window.URL.revokeObjectURL(data)
			}, 100)
		})
	}

    render() {
    	const { products, services } = this.props.items
    	
        return (
        	<div className="rounded bg-white border p-3 mb-3 h-100">
        		<div className="d-flex align-items-end flex-column bd-highlight h-100">
		            <div className="row">
		            	<div className="col-6 mb-3">
		            		<div className="color-grey">{getLang('Pedido')}:</div>
		            		<div>{this.props.id}</div>
		            	</div>
		            	<div className="col-6 mb-3">
		            		<div className="color-grey">{getLang('Valor')}:</div>
		            		<div><Price current={this.props.items_total} /></div>
		            	</div>
		            	<div className="col-6 mb-3">
		            		<div className="color-grey">{getLang('Data de compra')}:</div>
		            		<div>{getDate(this.props.created_at)}</div>
		            	</div>
		            	<div className="col-6 mb-3">
		            		<div className="color-grey">NF-e:</div>
		            		{
		            			this.props.receipts.length
		            			? 	<div><span className="color-green pointer" onClick={this.loadOrder}>{getLang('Baixar')}</span></div>
		            			: 	<div><span className="color-grey">--</span></div>
	            			}
		            	</div>
		            	<div className="col-12 mb-3">
		            		<div className="color-grey">{getLang('Produto')}(s):</div>
		            		<div>
		            			{ [...products, ...services].map((item, i) => this.printList(item, i)) }
		            		</div>
		            		
		            	</div>
	            	</div>
	            	<div className="mt-auto w-100">
	            		<div className="color-grey mb-3">{getLang('Vendido e entregue por')}</div>
		            	<BtnMain
	        				className="btn-block font-weight-bold"
	        				onClick={this.goDetails}
	        				title="Detalhes do pedido" />
    				</div>
	            </div>
			</div>
        );
    }
}

export default CardPurchase