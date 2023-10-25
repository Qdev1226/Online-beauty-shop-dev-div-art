import React, { Component } from 'react'
import store, { history } from 'store'
import { updateUser } from 'actions/user.js'
import BtnMain from 'components/buttons/btn_main.js'
import Input from 'components/inputs/input.js'
import Select from 'components/inputs/select'
import { format } from 'utils/mask'
import { getLang } from 'utils/lang'

class ProfileForm extends Component {

    constructor(props) {
        super(props)
        this.user = {}
    }

    save = () => {
        const data = {
            first_name: this.user.first_name.value,
            last_name: this.user.last_name.value,
        }
        store.dispatch(updateUser(data)).then(res => {
            if (res) {
                history.goBack()
            }
        })
    }

    checkMask = (mask, field) => e => {
        this.user[field].value = format(mask, e.target.value)
    }

    render() {
        const { first_name, last_name, user_email } = this.props
        return (
        	<div>
                <Input 
                    required
                    label={getLang("Name")}
                    value={first_name}
                    onChange={this.checkMask('alphabet', 'first_name')}
                    inputRef={ref => this.user.first_name = ref} />
                <Input 
                    required
                    label={getLang("Sobrenome")}
                    value={last_name}
                    onChange={this.checkMask('alphabet', 'last_name')}
                    inputRef={ref => this.user.last_name = ref} />
                <Input 
                    required
                    label="E-mail"
                    type="email"
                    value={user_email}
                    onChange={this.checkMask('email', 'email')}
                    inputRef={ref => this.user.email = ref} />
                <Input 
                    required
                    placeholder="DD/MM/YYYY"
                    label={getLang("Data de nascimento")}
                    onChange={this.checkMask('date', 'birth')}
                    inputRef={ref => this.user.birth = ref} />
                <Select 
                    required
                    label={getLang("Sexo")}
                    options={[{value: getLang('Masculino')}, {value: getLang('Feminino')}]} />
                <Input 
                    required
                    label={getLang("Número do CPF")}
                    onChange={this.checkMask('cpf', 'cpf')}
                    inputRef={ref => this.user.cpf = ref} />
                <div className="row justify-content-center">
                    <div className="form-group col-sm-8">
                        <BtnMain
                            className="btn-block btn-outline font-weight-bold"
                            onClick={() => history.goBack()}
                            title="Cancelar" />
                        <BtnMain
                            className="btn-block font-weight-bold"
                            onClick={this.save}
                            title="Salvar" />
                    </div>
                </div>
			</div>
        );
    }
}

export default ProfileForm