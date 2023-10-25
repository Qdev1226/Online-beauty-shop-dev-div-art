import React, { Component } from 'react'

class Price extends Component {

    format = num => {
        if (num.length >= 7) {
            return `${num.slice(0, 3)}.${num.slice(3, 6)}.${num.slice(6)}`
        }

        if (num.length >= 6) {
            return `${num.slice(0, 3)}.${num.slice(3)}`
        }

        if (num.length >= 5) {
            return `${num.slice(0, 2)}.${num.slice(2)}`
        }

        if (num.length > 3) {
            return `${num.slice(0, 1)}.${num.slice(1)}`
        }
        return num
    }

    render() {
        const current = this.props.current ? this.props.current.toString().split('.') : '0'
        const old = this.props.old ? this.props.old.toString().split('.') : ''
        
        const cent = current[1] ? current[1].length > 1 ? current[1].slice(0,2) : `${current[1]}0` : '00'
        const centOld = old[1] ? old[1].length > 1 ? old[1] : `${old[1]}0` : '00'

        return (
            <div className={this.props.className}>
                {
                    this.props.old
                    ?   <span><span className="price-old fs-18" style={this.props.style}>R$&nbsp;{this.format(old[0])}<sup><small>,{centOld}</small></sup></span>&nbsp;&nbsp; </span>
                    :   ''
                }
                <span className="fs-22 no-wrap" style={this.props.style}>R$&nbsp;{this.format(current[0])}<sup><small>,{cent}</small></sup></span>
            </div>
        );
    }
}

export default Price