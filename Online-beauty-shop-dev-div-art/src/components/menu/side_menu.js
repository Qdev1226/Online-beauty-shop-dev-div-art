import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { Link } from 'react-router-dom'
import { toggleSideMenu } from 'actions/design.js'
import { logout } from 'actions/auth'
import { LoginForm } from 'components/forms'
import { LIST_MENU } from 'config'
import './style.css'
import Avatar from 'components/images/avatar'

class SideMenu extends Component {
    toggleSideMenu = () => {
        store.dispatch(toggleSideMenu(false))
    }

    printMenu = (item, i) => {
        return  <div key={i} className="pl-5 py-3">
                    <img src={`/assets/icons/${item.icon_white}`} alt="" className="img-icon" />
                    <Link className="pl-5" to={`/${item.url}`}>{item.title}</Link>
                </div>
    }

    logout = () => {
        store.dispatch(logout())
    }

    render() {
        const activeClass = this.props.design.sideMenu ? 'active' : ''
        const { first_name, last_name } = this.props.user.data
        const image_url = this.props.user.data.user_image.image_url
        return (
            <div className={"text-white wrap-side-menu pl-5 " + activeClass}>
                    {
                        this.props.user.guest
                        ?   <div className="pt-55 px-5 mb-5">
                                <div className="col text-right align-self-center">
                                    <img src="/assets/icons/close-icon.png" onClick={this.toggleSideMenu} className="img-icon" alt="" />
                                </div>
                                <LoginForm close={this.toggleSideMenu} />
                            </div>
                        :   <div>
                                <div className="row pt-55 px-5 mb-5">
                                    <div className="col">
                                        <div className="form-group">
                                            <Avatar image={image_url} defaultImg="/assets/images/default-avatar.png" edit={false} />
                                        </div>
                                    </div>
                                    <div className="col text-right align-self-center">
                                        <img src="/assets/icons/close-icon.png" onClick={this.toggleSideMenu} className="img-icon" alt="" />
                                    </div>
                                    <div className="col-12">
                                        <h2>{`${first_name} ${last_name}`}</h2>
                                    </div>
                                </div>
                                <div>
                                    { LIST_MENU.map((item, i) => this.printMenu(item, i)) }
                                    <div className="px-5 py-3 pt-4">
                                        <img src={`/assets/svg/Logout-white.svg`} alt="" className="img-icon-header" />
                                        <span className="pl-5 pointer" onClick={this.logout}>Logout</span>
                                    </div>
                                </div>
                            </div>
                    }
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        user: {
            guest: state.user.guest,
            data: {
                first_name: state.user.data.first_name,
                last_name: state.user.data.last_name,
                user_image: {
                    image_url: state.user.data.user_image.image_url,
                }
            }
        },
        design: {
            sideMenu: state.design.sideMenu
        }
    })

export default connect(
    mapStateToProps
)(SideMenu)