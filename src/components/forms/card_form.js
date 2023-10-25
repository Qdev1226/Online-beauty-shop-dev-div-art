import React, { Component } from 'react'
import { history } from 'store'
import Input from 'components/inputs/input'
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

    render() {
        const card = history.location.state || {}
        return (
        	<form onChange={this.props.onChange(this.card)}>
                <Input 
                    required
                    label={getLang("Nome para o cartão")}
                    description={getLang("ex: meu cartão")}
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
                            value={''}
                            onChange={this.checkMask('dd/mm', 'validity_month')}
                            inputRef={ref => this.card.validity_month = ref} />
                    </div>
                    <div className="col-md-6">
                        <Input 
                            required
                            label={getLang("Código de segurança")}
                            value={''}
                            onChange={this.checkMask('cvv', 'cvv')}
                            inputRef={ref => this.card.cvv = ref} />
                    </div>
                </div>
			</form>
        );
    }
}

export default CardForm