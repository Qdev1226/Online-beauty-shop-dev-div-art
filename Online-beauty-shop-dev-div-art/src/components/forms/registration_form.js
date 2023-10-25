import React, { Component } from 'react'
import store from 'store'
import { registration } from 'actions/auth'
import { setAlert } from 'actions/design'
import BtnMain from 'components/buttons/btn_main'
import Input from 'components/inputs/input'
import SmallSwitch from 'components/inputs/small_switch'
import { format } from 'utils/mask'

class RegistrationForm extends Component {

    constructor(props) {
        super(props)
        this.auth = {}
        this.state = {
            terms: false,
            email: false
        }
    }

    registration = () => {
        if (this.state.terms) {
            let data = {
                email: this.auth.email.value,
                password: this.auth.password.value,
            }
            
            if (this.props.type === 'client') {
                data.first_name = this.auth.first_name.value
                data.last_name = this.auth.last_name.value
            } else {
                data.cnpj = this.auth.cnpj.value
                data.company_name = this.auth.company_name.value
            }
            store.dispatch(registration(data, this.props.type))
        } else {
            store.dispatch(setAlert('Você deve concordar com os termos e condições de uso', 'error'))
        }
    }

    toggleTerms = terms => {
        this.setState({terms: !this.state.terms})
    }

    toggleEmail = val => {
        this.setState({email: !this.state.email})
    }

    checkMask = (mask, field) => e => {
        this.auth[field].value = format(mask, e.target.value)
    }

    render() {
        return (
        	<div>
                <div className={this.props.type === 'client' ? '' : 'd-none'}>
                    <Input 
                        required
                        label="Name"
                        value={''}
                        
                        inputRef={ref => this.auth.first_name = ref} />
                    <Input 
                        required
                        label="Sobrenome"
                        value={''}
                        inputRef={ref => this.auth.last_name = ref} />
                </div>
                <div className={this.props.type === 'vendor' ? '' : 'd-none'}>
                    <Input 
                        required
                        label="CNPJ"
                        value={''}
                        onChange={this.checkMask('cnpj', 'cnpj')}
                        inputRef={ref => this.auth.cnpj = ref} />
                    <Input 
                        required
                        label="Razão social"
                        value={''}
                        inputRef={ref => this.auth.company_name = ref} />
                </div>
                <Input 
                    required
                    type="email"
                    label="E-mail"
                    value={''}
                    inputRef={ref => this.auth.email = ref} />
                <Input 
                    required
                    type="password"
                    label="Senha"
                    className="mb-5"
                    value={''}
                    inputRef={ref => this.auth.password = ref} />
                <SmallSwitch
                    className="mb-3"
                    onChange={this.toggleEmail} 
                    value={true}
                    title="Desejo receber ofertas por e-mail"
                    checked={this.state.email} />
                <SmallSwitch
                    className="mb-3"
                    onChange={this.toggleTerms} 
                    value={true}
                    title={<span>Li e concordo com os <span className="pointer color-green">Termos e Condições de Uso</span></span>}
                    checked={this.state.terms} />
                <div className="row">
                    <div className="col-sm-10 offset-sm-1">
                        <BtnMain
                            className="font-weight-bold btn-block"
                            onClick={this.registration}
                            title="Criar conta" />
                    </div>
                </div>
			</div>
        );
    }
}

export default RegistrationForm