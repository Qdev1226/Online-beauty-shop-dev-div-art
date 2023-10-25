import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import BtnMain from 'components/buttons/btn_main.js'
import AddressCard from 'components/cards/address.js'
import CreditCardCard from 'components/cards/credit_card.js'
import { getCreditCards } from 'actions/user'

class AddressList extends Component {
    
    componentWillMount() {
        [, , this.type] = history.location.pathname.split('/')
        switch (this.type) {
            case 'cards':
                store.dispatch(getCreditCards())
                break
            default: return
        }
    }

    printList = (item, i) => {
        const card = this.type === 'cards' ? <CreditCardCard item={item} /> : <AddressCard item={item} />
        return  <div key={i} className="col-md-6 mb-3">
                    {card}
                </div>
    }

	render() {
        let list = []
        let nameButton
        switch (this.type) {
            case 'address':
                list = this.props.user.data.addresses
                nameButton = 'Adicionar endereço'
                break
            case 'cards':
                list = this.props.user.data.cards
                nameButton = 'Novo Cartão'
                break
            default: return
        }
		return (
			<div className="row">
			    <div className="col-12 col-md-6">
                    <BtnMain
                        className="font-weight-bold btn-outline btn-block"
                        onClick={() => history.push(`/profile/${this.type}/add`)}
                        title={nameButton} />
                </div>
                <div className="col-12 mb-3"></div>
                { list.map((item, i) => this.printList(item, i)) }
			</div>
		)
	}
}

const mapStateToProps = state => 
	({
        user: {
        	data: {
        		addresses: state.user.data.addresses,
                cards: state.user.cards
        	}
        }
    })

export default connect(
    mapStateToProps
)(AddressList)