import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import CartTotal from 'components/cards/cart_total'
import RadioSwitch from 'components/inputs/radio_switch'
import BtnMain from 'components/buttons/btn_main'
import { AddressForm } from 'components/forms'
import { toggleModal } from 'actions/design'
import { chooseDelivery } from 'actions/cart'
import Price from 'components/price'
import { getLang } from 'utils/lang'

let state = {
    delivery: 0
}

class StepSecond extends Component {
    constructor() {
        super()
        this.state = state
    }

    toggleDelivery = value => {
        this.setState({
            delivery: value
        })

        store.dispatch(chooseDelivery(value))
    }

    changeAddress = () => {
        if (this.props.user.guest) {
            store.dispatch(toggleModal(true, AddressForm, 'modal-md', 'Você ainda não cadastrou um endereço de entrega'))
        } else {
            history.push('/profile/address/')
        }
    }

    printSwitch = (item, i) => {
        return  <div key={i} className="d-flex justify-content-between mb-4">
                    <RadioSwitch 
                        onChange={this.toggleDelivery} 
                        value={item.id}
                        title={getLang(item.name)}
                        checked={this.state.delivery} />
                    <div className="color-grey">
                        { item.price ? <Price current={item.price} /> : getLang('Grátis') }
                    </div>
                </div>
    }

    componentWillUnmount() {
        state = this.state
    }

    render() {
        const { main_address } = this.props.user.data
        const { guestAddress, delivery_types } = this.props.cart
        return (
        	<div className="row pb-5">
        		<div className="col-sm-6">
                    <h4>{getLang('Dados do endereço')}</h4>
                    {
                        !this.props.user.guest
                        ?   
                            <div className="rounded bg-white p-4 mb-3">
                                <div className="fs-18 mb-3">{`${main_address.recipient_first_name} ${main_address.recipient_last_name}`}</div>
                                <div className="color-grey">{main_address.title}</div>
                                <div className="color-grey">{main_address.state}, {main_address.state}</div>
                                <div className="color-grey">{getLang('CEP')}: {main_address.zipcode}</div>
                            </div>
                        :   Object.keys(guestAddress).length
                            ?   <div className="rounded bg-white p-4 mb-3">
                                    <div className="fs-18 mb-3">{`${guestAddress.recipient_first_name} ${guestAddress.recipient_first_name}`}</div>
                                    <div className="color-grey">{guestAddress.title}</div>
                                    <div className="color-grey">{guestAddress.state}, {guestAddress.state}</div>
                                    <div className="color-grey">{getLang('CEP')}: {guestAddress.zipcode}</div>
                                </div>
                            :   ''
                    }  
                    <div className="mb-3">
                        <BtnMain
                            className="btn-block btn-outline font-weight-bold bg-main"
                            onClick={this.changeAddress}
                            title="Alterar endereço" />
                    </div>
        			<h4>{getLang('Tipo de envio')}</h4>
                    <div className="rounded bg-white px-4 pt-4 pb-2">
                        { delivery_types.map((item, i) => this.printSwitch(item, i)) }
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

const mapStateToProps = state =>
    ({
        cart: {
            guestAddress: state.cart.guestAddress,
            delivery_types: state.cart.delivery_types,
        },
        user: {
            data: {
                main_address: state.user.data.main_address,
                first_name: state.user.data.first_name,
                last_name: state.user.data.last_name,
            },
            guest: state.user.guest
        }
    })

export default connect(
    mapStateToProps
)(StepSecond)