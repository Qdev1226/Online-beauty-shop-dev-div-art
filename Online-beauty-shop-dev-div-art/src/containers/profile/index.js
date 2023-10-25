import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import SideMenuWeb from 'components/menu/side_menu_web.js'
import { Info, Edit, List, Wishlist, Support, Vouchers, Credits, Schedules, Purchased, Notifications, Feedback } from 'components/profile'

class Profile extends Component {

    render() {
        return (
        	<div className="bg-main font-avenir py-4">
        		<div className="container">
        			<div className="row">
        				<div className="col-lg-3 col-md-4 col-sm-5">
	            			<SideMenuWeb />
	            		</div>
	            		<div className="col-lg-9 col-md-8 col-sm-7">
	            			<Switch>
	            				<Route path="/profile" exact component={Info} />
	            				<Route path="/profile/edit" exact component={Edit} />
	            				<Route path="/profile/address" exact component={List} />
	            				<Route path="/profile/cards" exact component={List} />
	            				<Route path="/profile/:formType/edit" exact component={Edit} />
	            				<Route path="/profile/:formType/add" exact component={Edit} />

	            				<Route path="/wishlist" exact component={Wishlist} />
	            				<Route path="/vouchers" exact component={Vouchers} />
	            				<Route path="/credits" exact component={Credits} />
	            				<Route path="/schedules" exact component={Schedules} />
	            				<Route path="/purchased" exact component={Purchased} />
	            				<Route path="/purchased/:id" exact component={Purchased} />
	            				<Route path="/notifications" exact component={Notifications} />
	            				<Route path="/feedback" exact component={Feedback} />
	            				<Route path="/support" exact component={Support} />
	            			</Switch>
	            		</div>
	            	</div>
	            </div>
			</div>
        );
    }
}

export default Profile