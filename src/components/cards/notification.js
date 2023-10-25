import React, { Component } from 'react'
import store from 'store'
import { NOTIFICATION_TYPE } from 'config'
import BtnMain from 'components/buttons/btn_main'
import { getLang } from 'utils/lang'
import { tempRemoveNotify, removeNotify, getNotifications } from 'actions/user'

class CardNotification extends Component {

	tempRemove = () => {
		store.dispatch(tempRemoveNotify(this.props.id))
	}

	remove = () => {
		store.dispatch(removeNotify(this.props.id))
		.then(res => {
			if (res) {
				store.dispatch(getNotifications())
			}
		})
	}

	sendThanks = () => {
		//store.dispatch(sendThanks())
	}

    render() {
    	console.log(this.props.type)
    	const notify = {...NOTIFICATION_TYPE[this.props.type], desc: this.props.message}
        return (
        	<div className="rounded bg-white border p-3 mb-3">
	            <div className="row justify-content-between align-items-sm-center">
	            	<div className="col-3 col-md-2">
	            		<img src={notify.icon} alt="" className="img-fluid" />
	            	</div>
	            	<div className="col-9 col-md-10 mb-2">
	            		<h4>{getLang(notify.title)}</h4>
	            		<div className="border-bottom mb-2"></div>
	            		<div className="color-grey">
	            			{ getLang(notify.desc) }
	            		</div>
	            	</div>
	            	<div className="col-12 col-md-10 offset-md-2">
	            		<div className="d-flex flex-wrap">
	            			<div className="col order-2 px-1 mb-2">
			            		<BtnMain
			        				className="btn-outline w-100 font-weight-bold"
			        				onClick={this.tempRemove}
			        				title="Lembrar mais tarde" />
	        				</div>
	        				<div className="col order-3 px-1 mb-2">
		        				<BtnMain
			        				className="btn-outline w-100 font-weight-bold"
			        				onClick={this.remove}
			        				title="Excluir" />
	        				</div>
		            		{
		            			this.props.type === 'gift'
		            			? 	<div className="col order-4 order-sm-1 px-1 mb-2">
				            			<BtnMain
					        				className="btn-outline w-100 font-weight-bold"
					        				onClick={this.sendThanks}
					        				title="Agradecer" />
			        				</div>
		            			: 	''
		            		}
        				</div>
	            	</div>
	            </div>
			</div>
        );
    }
}

export default CardNotification