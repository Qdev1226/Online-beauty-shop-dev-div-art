import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { toggleLeftMenu } from 'actions/design.js'
import './style.css'

class LeftMenu extends Component {
    toggleLeftMenu = () => {
       store.dispatch(toggleLeftMenu(false))
    }

    render() {
        const activeClass = this.props.design.leftMenu.state ? 'active' : ''
        return (
            <div className={`wrap-left-menu ${activeClass}`}>
            	<div className="pt-4 px-3">
                    <div className="mb-3">
                        <img src="/assets/icons/left-icon.png" alt="" className="img-fluid img-icon" onClick={this.toggleLeftMenu} />
                    </div>
                    <div>
                        {this.props.design.leftMenu.body}
                    </div>
            	</div>
            </div>
        )
    }
}

const mapStateToProps = state =>
    ({
        design: {
            leftMenu: state.design.leftMenu
        }
    })

export default connect(
    mapStateToProps
)(LeftMenu)