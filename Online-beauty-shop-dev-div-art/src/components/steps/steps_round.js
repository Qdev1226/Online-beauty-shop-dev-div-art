import React, { Component } from 'react'
import './steps_round.css'
import { getLang } from 'utils/lang'

class StepsRound extends Component {
	printList = (item, i) => {
		const activeClass = i + 1 <= this.props.active ? 'active' : ''
		const title = i + 1 === this.props.active ? <b>{item}</b> : item
		return  <div key={i} className="wrap-point position-relative">
	            	<div className={`steps-point p-2 border-green ${activeClass}`}></div>
	            	<div className="position-absolute point-text text-sm-nowrap text-sm-left pt-1">{title}</div>
            	</div>
	}
    render() {
    	const activeClass = `active-${this.props.active}`
    	const steps = [getLang('Pedido efetuado'), getLang('Processando...'), getLang('Em transporte'), getLang('Produto entregue')]
        return (
    		<div className="wrap-wrap-steps px-sm-5 px-3 py-5">
	            <div className={`${activeClass} wrap-steps-round d-flex justify-content-between align-items-center position-relative`}>
	            	{ steps.map((item, i) => this.printList(item, i)) }
	            </div>
            </div>
        );
    }
}

export default StepsRound