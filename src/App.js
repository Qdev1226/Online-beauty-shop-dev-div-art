import React, { Component } from 'react'
import routing from 'config/route'
import store, { history } from 'store'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import 'App.css'
import Footer from 'components/footer'
import * as pages from 'containers'
import { loginAsGuest, keepToken } from 'actions/auth'
import { setLocation, toggleSideMenu } from 'actions/design'
import Header from 'components/header'
import SideMenu from 'components/menu/side_menu'
import LeftMenu from 'components/menu/left_menu'
import Modal from 'components/modal'
import Alert from 'components/alert'
import Viewer from 'components/images/viewer'
import { WithOutConnection } from 'containers'

class App extends Component {
    constructor(props) {
        super(props)
        if (!this.props.user.token) {
            store.dispatch(loginAsGuest())
        } else {
            store.dispatch(keepToken(this.props.user.token))
        }

        history.listen((location, action) => {
            store.dispatch(setLocation(location.pathname))
            if (this.props.design.sideMenu) {
                store.dispatch(toggleSideMenu(false))
            }
            window.scrollTo(0, 0)
        })

        String.prototype.replaceAll = function(search, replacement) {
            return this.replace(new RegExp(search, 'g'), replacement)
        };
    }

    printRoutes = (route, i) => <Route key={i} path={route.path} exact component={pages[route.component]} />

    render() {
        const { approve_token, guest } = this.props.user
        const key = !guest ? 'private' : 'public'
        const unactiveClass = this.props.design.sideMenu ? 'unactive' : ''
        return (
            <div className="App">
                {
                    approve_token
                    ?   <div className="overflow-hidden">
                            <div className={`back-main-wrap ${unactiveClass}`}></div>
                            <div className={`second-back-main-wrap ${unactiveClass}`}></div>
                            <div id="main-wrap" className={`main-wrap ${unactiveClass}`} style={{overflowX: 'unset'}}>
                                <Header />
                                <Switch>
                                    { routing[key].map((route, i) => this.printRoutes(route, i)) }
                                </Switch>
                                <Footer />
                            </div>
                            <SideMenu />
                            <LeftMenu />
                            
                            <Alert />
                            <Viewer />
                        </div>
                    :   <WithOutConnection />
                }
                <Modal />
            </div>
        )
    }
}

const mapStateToProps = state =>
    ({
        user: {
            token: state.user.token,
            approve_token: state.user.approve_token,
            guest: state.user.guest
        },
        design: {
            sideMenu: state.design.sideMenu
        }
    })

export default connect(
    mapStateToProps
)(App)

