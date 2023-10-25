import React, { Component } from 'react'
import './collapsed_menu.css'

class CollapsedMenu extends Component {
    state = {
        active: true
    }

    toggleBody = active => e => {
        this.setState({active: !active})
    }

    render() {
        const activeClass = this.state.active ? ' active' : ''
        return (
            <div className="mb-2">
                <div className="d-flex align-items-start">
                    <div className="position-relative color-grey" style={{width: 15, height: 19, paddingTop: 2}}>
                        <object className="position-absolute" data="/assets/svg/minus.svg" width="100%" style={{opacity: this.state.active ? 1 : 0}} type="image/svg+xml"></object>
                        <object className="position-absolute" data="/assets/svg/plus.svg" width="100%" style={{opacity: this.state.active ? 0 : 1}} type="image/svg+xml"></object>
                        <div onClick={this.toggleBody(this.state.active)} className="position-absolute w-100 h-100 pointer z-index-1" style={{top: 0}}></div>
                    </div>
                    <div className="px-2">
                        <span className="fs-18" style={{lineHeight: 1}}>{this.props.title}</span>
                    </div>
                </div>
                <div className={`wrap-collapsed-body${activeClass}`}>
                    {this.props.body}
                </div>
            </div>   
        );
    }
}

export default CollapsedMenu