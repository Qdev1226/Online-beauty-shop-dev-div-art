import React, { Component } from 'react'
import store, { history } from 'store'
import { toggleDefaultCard, removeCreditCard } from 'actions/user'
import BtnMain from 'components/buttons/btn_main.js'
import CheckBox from 'components/inputs/checkbox.js'

class CreditCardCard extends Component {
	changeDefaultCard = item => e => {
        store.dispatch(toggleDefaultCard(item.id))
    }

    gotoAddress = (url, item) => e => {
        const state = item ? Object.assign({}, item, {defaultCard: item.defaultCard.checked}) : {}
        history.push(url, state)
    }

    removeCart = () => {
        store.dispatch(removeCreditCard(this.props.item.id))
    }

    getCardNumber = num => `****.****.****.${num.slice(-4)}`

	render() {
		const item = this.props.item

		return (
            <div className="rounded p-3 bg-white">
                <div className="d-flex justify-content-between pb-3">
                    <div className="fs-18">
                        <h4>{ item.card_name }</h4>
                    </div>
                    <div className="w-35">
                        <div className="d-flex justify-content-center">
                            <div>
                            <CheckBox
                                title={item.default_card ? 'Principal' : 'Tornar Principal'}
                                vertical
                                value={item.default_card}
                                onChange={this.changeDefaultCard(item)}
                                inputRef={ref => item.defaultCard = ref} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-bottom mb-3"></div>
                <div className="color-grey mb-2 fs-18">{ this.getCardNumber(item.card_number) }</div>
                <div className="color-grey mb-3 fs-18">{ item.name_on_card }</div>
                <BtnMain
                    className="font-weight-bold btn-outline btn-block"
                    onClick={this.gotoAddress('edit', item)}
                    title="Editar" />
                <BtnMain
                    className="font-weight-bold btn-block"
                    onClick={this.removeCart}
                    title="Excluir" />
            </div>
        )
	}
}

export default CreditCardCard