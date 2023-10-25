import React, { Component } from 'react'
import BtnMain from 'components/buttons/btn_main'
import Input from 'components/inputs/input'
import store, { history } from 'store'
import { login, loginGoogle, loginFacebook } from 'actions/auth'
import { getLang } from 'utils/lang'

class LoginForm extends Component {
    
    login = e => {
        e.preventDefault()
        const data = {
            email: this.email.value,
            password: this.password.value,
        }

        store.dispatch(login(data)).then(res => {
            if (res) {
               this.props.close()
               history.push('/')
            }
        })
    }

    loginGoogle = () => {
        const script = document.createElement('script')
        script.src = 'https://apis.google.com/js/platform.js'
        script.onload = () => {
            window.gapi.load('auth2', () => {
                let auth2 = window.gapi.auth2.init({
                    'client_id': '55526766344-8jfclisoipen6s8r4rmvn1v9hdnpoh04.apps.googleusercontent.com',
                    'cookiepolicy': 'google-signin-scope',
                    'scope': 'profile email'
                });
                let element = document.getElementById('google')
                auth2.attachClickHandler(element, {}, googleUser => {
                    console.log(googleUser)
                    const data = {
                        id_token: googleUser.getAuthResponse().id_token
                    }
                    store.dispatch(loginGoogle(data))
                })
            });
        }
        document.body.appendChild(script)
    }

    loginFacebook = () => {
        window.FB.login(response => {
            window.FB.api('/me', {fields: ['first_name, last_name, email, picture.width(2048), gender, locale']}, response => {
                window.FB.getLoginStatus(res => {
                    if (res.status === 'connected') {
                        const data = {
                            id_token: res.authResponse.accessToken
                        }
                        store.dispatch(loginFacebook(data))
                    }
                })
            });
        }, {scope: 'public_profile, email'});
    }

    componentDidMount() {
       this.loginGoogle()
    }

    goToAddress = address => e => {
        this.props.close()
        history.push(`/${address}`)
    }

    render() {
        return (
        	<form onSubmit={this.login}>
                <h4 className="text-center">{getLang('Identificação')}</h4>
                <div className="form-group">
                    <Input 
                        required
                        label="Email"
                        inputRef={ref => this.email = ref} />
                </div>
                <div className="form-group">
                    <Input 
                        required
                        type="password"
                        label={getLang("Senha")}
                        inputRef={ref => this.password = ref} />
                </div>
            	<div className="form-group">
            		<BtnMain
        				className="font-weight-bold btn-block"
                        type="submit"
        				title="Entrar" />
            	</div>
                <div className="form-group text-right">
                    <span onClick={this.goToAddress('recovery')} className="color-grey pointer">{getLang("Esqueceu a senha?")}</span>
                </div>
                <div className="border-bottom mb-2"></div>
                <div className="d-flex flex-sm-row flex-column form-group">
                    <div className="pr-sm-1 mb-1">
                        <BtnMain
                            className="btn-block btn-facebook px-1"
                            onClick={this.loginFacebook}
                            title="Entrar com o Facebook" />
                    </div>
                    <div id="google" className="pl-sm-1">
                        <BtnMain
                            className="btn-block btn-google px-1"
                            title="Entrar com o Google +" />
                    </div>
                </div>
                <div className="form-group">
                    <BtnMain
                        className="font-weight-bold btn-outline btn-block"
                        onClick={this.goToAddress('registration')}
                        title="Criar cadastro" />
                </div>
			</form>
        );
    }
}

export default LoginForm