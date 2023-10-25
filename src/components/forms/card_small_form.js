import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { setGuestInfo } from 'actions/cart'
import Input from 'components/inputs/input'
import BtnMain from 'components/buttons/btn_main'
import CheckBox from 'components/inputs/checkbox'
import { format } from 'utils/mask'
import { getLang } from 'utils/lang'

class CardForm extends Component {

    constructor(props) {
        super(props)
        this.card = {}
    }

    checkMask = (mask, field) => e => {
        this.card[field].value = format(mask, e.target.value)
    }

    saveCard = () => {
        const [m, y] = this.card.validity_month.value.split('/')
        const data = {
            card_name: this.card.card_name.value,
            name_on_card: this.card.name_on_card.value,
            card_number: this.card.card_number.value.replaceAll('\\.', ''),
            validity_month: m,
            validity_year: y,
            cvv: this.card.cvv.value,
        }
        store.dispatch(setGuestInfo(data, 'guestCard'))
        this.props.onCancel()
    }

    render() {
        const card = this.props.cart.guestCard
        return (
        	<form>
                <Input 
                    required
                    label={getLang("Nome para o cartão")}
                    description={getLang("ex: Meu cartão")}
                    value={card.card_name}
                    onChange={this.checkMask('alphabet', 'card_name')}
                    inputRef={ref => this.card.card_name = ref} />
                <Input 
                    required
                    label={getLang("Nome impresso no cartão")}
                    value={card.name_on_card}
                    onChange={this.checkMask('alphabet', 'name_on_card')}
                    inputRef={ref => this.card.name_on_card = ref} />
                <Input 
                    required
                    label={getLang("Número do cartão")}
                    value={card.card_number}
                    onChange={this.checkMask('card', 'card_number')}
                    inputRef={ref => this.card.card_number = ref} />
                <div className="row">
                    <div className="col-md-6">
                        <Input 
                            required
                            label={getLang("Validate")}
                            placeholder="DD/MM"
                            value={card.validity_month}
                            onChange={this.checkMask('dd/mm', 'validity_month')}
                            inputRef={ref => this.card.validity_month = ref} />
                    </div>
                    <div className="col-md-6">
                        <Input 
                            required
                            label={getLang("Código de segurança")}
                            value={card.cvv}
                            onChange={this.checkMask('cvv', 'cvv')}
                            inputRef={ref => this.card.cvv = ref} />
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col-12">
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                {getLang('Salvar cartão para as proximas as proximas compras')}
                            </div>
                            <CheckBox onChange={e => {console.log(e.target.checked)}} />
                        </div>
                        <div className="border-bottom mb-3"></div>
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                {getLang('É o mesmo endereço de entrega?')}
                            </div>
                            <CheckBox onChange={e => {console.log(e.target.checked)}} />
                        </div>
                            
                    </div>

                    <div className="col-sm-8 offset-sm-2">
                        <BtnMain
                            className="font-weight-bold btn-outline btn-block"
                            onClick={this.saveCard}
                            title="Continuar" />
                    </div>
                </div>
			</form>
        );
    }
}

const mapStateToProps = state =>
    ({
        cart: {
            guestCard: state.cart.guestCard
        }
    })

export default connect(
    mapStateToProps
)(CardForm)