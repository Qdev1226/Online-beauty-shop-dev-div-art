import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScheduleCartTotal from 'components/cards/schedule_cart_total'
import { getLang } from 'utils/lang'

class StepFourth extends Component {

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
                    <ScheduleCartTotal value={this.props.cart.total} step={this.props.step} />
        		</div>
        	</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        cart: {
            total: state.cart.total
        }
    })

export default connect(
    mapStateToProps
)(StepFourth)