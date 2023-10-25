import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getNotifications } from 'actions/user'
import CardNotification from 'components/cards/notification'
import { getLang } from 'utils/lang'

class Notifications extends Component {

	componentWillMount() {
		store.dispatch(getNotifications())
	}

	printList = (item, i) => <CardNotification {...item} key={i} />

	render() {
		return (
			<div>
			{
				this.props.user.notifications.length
				? 	this.props.user.notifications.map((item, i) => this.printList(item, i))
				: 	<div className="bg-white rounded p-3">{getLang('Você não possui nenhuma notificação')}</div>
			}
			</div>
		)
	}
}

const mapStateToProps = state => 
	({
        user: {
        	notifications: state.user.notifications
        }
    })

export default connect(
    mapStateToProps
)(Notifications)