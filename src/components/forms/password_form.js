import React, { Component } from 'react'
import store, { history } from 'store'
import { changePassword } from 'actions/user'
import { toggleModal } from 'actions/design'
import BtnMain from 'components/buttons/btn_main'
import Input from 'components/inputs/input'
import { getLang } from 'utils/lang'

class PasswordForm extends Component {
    save = () => {
        const data = {
            old_password: this.password_old.value,
            new_password: this.password_new.value
        }

        store.dispatch(changePassword(data))
        .then(res => {
            if (res) {
                store.dispatch(toggleModal(true, this.confirmPassword, 'modal-sm text-center', 'Alterar senha', {position: 'center'}))
            }
        })
    }

    confirmPassword = props => {
        return  <div className="text-center">
                    <div className="mb-3">Senha alterada com successo</div>
                    <BtnMain
                        className="btn-block font-weight-bold"
                        onClick={() => {props.onCancel(); history.goBack()}}
                        title="Confirmar" />
                </div>
    }

    render() {
        return (
            <div>
                <Input 
                    required
                    type="password"
                    label={getLang("Senha antiga")}
                    inputRef={ref => this.password_old = ref} />
                <Input 
                    required
                    type="password"
                    label={getLang("Nova senha")}
                    inputRef={ref => this.password_new = ref} />
                <Input 
                    required
                    type="password"
                    label={getLang("Repetir nova senha")}
                    inputRef={ref => this.password_confirm = ref} />
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

export default PasswordForm