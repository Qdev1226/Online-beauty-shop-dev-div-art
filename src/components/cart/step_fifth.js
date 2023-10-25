import React, { Component } from 'react'
import CartTotal from 'components/cards/cart_total'
import { getLang } from 'utils/lang'

class StepFifth extends Component {

    render() {
        return (
        	<div className="row pb-5">
        		<div className="col-sm-6">
        			<h4>{getLang('Meu carrinho')}</h4>
                    <div className="rounded pt-4 pb-5 bg-white text-center">
                        <div className="row">
                            <div className="col-sm-4 col-6 offset-3 offset-sm-4 mb-3">
                                <img src="/assets/icons/check-icon-big.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <h5>{getLang('Pedido realizado com sucesso!')}</h5>
                    </div>
        		</div>
        		<div className="col-sm-6">
        			<h4>{getLang('Resumo do pedido')}</h4>
                    <CartTotal step={this.props.step} />
        		</div>
        	</div>
        );
    }
}

export default StepFifth