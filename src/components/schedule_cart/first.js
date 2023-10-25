import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScheduleCartTotal from 'components/cards/schedule_cart_total'
import ServiceCart from 'components/cards/service_cart'
import { MONTH } from 'config' 
import Calendar from 'components/calendar'
import { getLang } from 'utils/lang'

class StepFirst extends Component {
    render() {
        const { salon } = this.props.services
        const month = new Date().getMonth()
        const year = new Date().getFullYear()
        return (
        	<div className="row pb-5">
        		<div className="col-sm-6">
                    <h4>{getLang('Meu carrinho')}</h4>
                    <div className="mb-3">
                        <ServiceCart {...this.props.service} salon={salon} />
                    </div>
                    <h4>{ getLang(MONTH[month]) }, { year }</h4>
                    <Calendar year={year} month={month} />
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
        },
        services: {
            salon: state.services.salon
        }
    })

export default connect(
    mapStateToProps
)(StepFirst)