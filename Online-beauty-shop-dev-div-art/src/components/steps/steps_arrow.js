import React, { Component } from 'react'
import './steps_arrow.css'
import { getLang } from 'utils/lang'

class StepsArrow extends Component {
    printSteps = (item, i) => {
        let className = i + 1 === this.props.active ? 'nav-item active' : 'nav-item'
        return  <li key={i} className={className} onClick={this.props.onClick(i+1)}>
                    <span className="nav-link pointer">
                        {
                            i + 1 >= this.props.active
                            ?  <span className="step-number">{i+1}</span>
                            :  <span className="step-number check"><i className="fas fa-check"></i></span>
                        }
                        <span className="step-description">{getLang(item.title)}</span>
                    </span>
                </li>
    }

    render() {
        return (
            <div className={`sw-main sw-theme-arrows ${this.props.className}`}>
                <ul className="nav nav-tabs step-anchor rounded">
                    { this.props.steps.map((item, i) => this.printSteps(item, i)) }
                </ul>
            </div>
        );
    }
}

export default StepsArrow