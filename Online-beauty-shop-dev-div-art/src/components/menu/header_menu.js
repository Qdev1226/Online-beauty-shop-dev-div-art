import React, { Component } from 'react'
import store, { history } from 'store'
import { LIST_MENU } from 'config'
import { logout } from 'actions/auth'
import { getLang } from 'utils/lang'

class HeaderMenu extends Component {
	printList = (item, i) => {
        return  <div key={i} className="row align-items-center py-2" onClick={this.goToUrl(item.url)}>
        			<div className="col-2">
                    	<img src={`/assets/icons/${item.icon}.png`} alt="" className="img-fluid" />
                    </div>
                    <div className="col-10 pl-4">
                    	<span className="pointer">{getLang(item.title)}</span>
                	</div>
                </div>
    }

    logout = () => {
        store.dispatch(logout())
    }

    goToUrl = url => e => {
    	this.props.close()
    	history.push(`/${url}`)
    }

	render() {
		return (
			<div>
				{ LIST_MENU.map((item, i) => this.printList(item, i)) }
                <div className="border-bottom mb-2 mt-2"></div>
                <div className="row align-items-center">
                    <div className="col-2 text-center py-2">
                        <img src={`/assets/svg/Logout.svg`} alt="" style={{opacity: 0.8}} className="img-fluid" />
                    </div>
                    <div className="col-10 pl-4">
                        <span className="pointer" onClick={this.logout}>Logout</span>
                    </div>
                </div>
			</div>
		)
	}
}

export default HeaderMenu