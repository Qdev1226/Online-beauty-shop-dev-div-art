import React, { Component } from 'react'
import store from 'store'
import { toggleLeftMenu } from 'actions/design'
import { DROP_LIST } from 'config'
import './style.css'

class OrderMenu extends Component {
	printList = (item, i) => {
		return <div className="p-4 bg-white pointer border" onClick={this.handleClick(item)} key={i}>{item.title}</div>
	}

	handleClick = item => e => {
		this.props.onClickItem(item)
		store.dispatch(toggleLeftMenu(false, null))
	}

    render() {
        return (
        	<div className="wrap-order-menu">
	            { DROP_LIST.map((item, i) => this.printList(item, i)) }
			</div>
        );
    }
}

export default OrderMenu