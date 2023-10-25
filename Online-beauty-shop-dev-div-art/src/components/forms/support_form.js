import React, { Component } from 'react'
import store from 'store'
import BtnMain from 'components/buttons/btn_main'
import { format } from 'utils/mask'
import Input from 'components/inputs/input'
import TextArea from 'components/inputs/textarea'
import { sendSupport } from 'actions/user'
import { getLang } from 'utils/lang'

class SupportForm extends Component {
    constructor(props) {
        super(props)
        this.support = {}
    }

    checkMask = (mask, field) => e => {
        this.support[field].value = format(mask, e.target.value)
    }

    sendSupport = () => {
        const data = {
            name: this.support.name.value,
            message: this.support.message.value,
            email: this.support.email.value,
            phone: this.support.phone.value,
            cellphone: this.support.cellphone.value,
        }
        store.dispatch(sendSupport(data))
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <Input 
                            required
                            label={getLang("Nome")}
                            value={''}
                            onChange={this.checkMask('alphabet', 'name')}
                            inputRef={ref => this.support.name = ref} />
                        <Input 
                            required
                            label="E-mail"
                            type="email"
                            value={''}
                            onChange={this.checkMask('email', 'email')}
                            inputRef={ref => this.support.email = ref} />
                        <div className="row">
                            <div className="col-md-6">
                                <Input 
                                    required
                                    label={getLang("Telefone")}
                                    value={''}
                                    onChange={this.checkMask('cellphone', 'phone')}
                                    inputRef={ref => this.support.phone = ref} />
                            </div>
                            <div className="col-md-6">
                                <Input 
                                    required
                                    label={getLang("Celular")}
                                    value={''}
                                    onChange={this.checkMask('phone', 'cellphone')}
                                    inputRef={ref => this.support.cellphone = ref} />
                            </div>
                        </div>
                        <TextArea 
                            required
                            label={getLang("Mensagem")}
                            inputRef={ref => this.support.message = ref} />
                    </div>
                
                    <div className="col-sm-8 offset-sm-2">
                		<BtnMain
            				className="font-weight-bold btn-block pt-2"
                            onClick={this.sendSupport}
            				title="Enviar mensagem" />
                    </div>
    			</div>
            </div>
        );
    }
}

export default SupportForm