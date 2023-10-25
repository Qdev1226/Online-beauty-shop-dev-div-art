import React, { Component } from 'react'
import store, { history } from 'store'
import { removeAddress, toggleDefaultAddress } from 'actions/user'
import BtnMain from 'components/buttons/btn_main.js'
import CheckBox from 'components/inputs/checkbox.js'

class AddressCard extends Component {
	
    changeDefaultAddress = item => e => {
        if (e.target.checked) {
            store.dispatch(toggleDefaultAddress(item.id, e.target.checked))
        }
    }

    gotoAddress = (url, item) => e => {
        const state = item ? Object.assign({}, item, {defaultAddress: item.defaultAddress.checked}) : {}
        history.push(url, state)
    }

    removeAddress = () => {
        store.dispatch(removeAddress(this.props.item.id))
    }

	render() {
		const item = this.props.item
		return (
            <div className="rounded p-3 bg-white">
                <div className="d-flex justify-content-between pb-3">
                    <div className="fs-18">
                        <h4>{ item.title }</h4>
                    </div>
                    <div className="w-35">
                        <div className="d-flex justify-content-center">
                            <div>
                            <CheckBox
                                title={item.default ? 'Principal' : 'Tornar Principal'}
                                vertical
                                value={item.default}
                                onChange={this.changeDefaultAddress(item)}
                                inputRef={ref => item.defaultAddress = ref} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-bottom mb-3"></div>
                <div className="color-grey mb-2 fs-18">{`${item.street}, ${item.number}`}</div>
                <div className="color-grey mb-2 fs-18">{`${item.state}, ${item.city}, ${item.zipcode}`}</div>
                <div className="color-grey mb-2 fs-18">{`${item.country}`}</div>
                <div className="color-grey mb-3 fs-18">{`${item.recipient_phone}`}</div>
                <BtnMain
                    className="font-weight-bold btn-outline btn-block"
                    onClick={this.gotoAddress('edit', item)}
                    title="Editar" />
                <BtnMain
                    className="font-weight-bold btn-block"
                    onClick={this.removeAddress}
                    title="Excluir" />
            </div>
        )
	}
}

export default AddressCard