import React, { Component } from 'react'
import store from 'store'
import { setAlert } from 'actions/design'
import { resetPassword, checkHash } from 'actions/auth'
import { history } from 'store'
import Input from 'components/inputs/input'
import BtnMain from 'components/buttons/btn_main'
import { getLang } from 'utils/lang'

class Recovery extends Component {
	
	recovery = () => {
		if (this.props.match.params.hash) {
			if (this.password.value === this.password_confirm.value) {
				store.dispatch(checkHash({hash: this.props.match.params.hash, password: this.password.value}))
			} else {
				store.dispatch(setAlert('Passwords do not match', 'error'))
			}
		} else {
			store.dispatch(resetPassword({email: this.email.value}))
			.then(res => {
				if (res) {
					history.push('/')
				}
			})
		}
	}

    render() {
        return (
        	<div className="bg-main font-avenir pt-5 empty-content">
        		<div className="container">
		            <div className="row">
		            	<div className="col-md-6">
			    			<div className="rounded p-4 bg-white border mb-5">
			    				<h4>{getLang('Trocar a senha')}</h4>
		    					{
		    						this.props.match.params.hash
		    						? 	<div>
			    							<Input 
						                        required
						                        label="Nova Senha"
						                        type="password"
						                        inputRef={ref => this.password = ref} />
					                        <Input 
							                    required
							                    type="password"
							                    label="Repetir nova senha"
							                    inputRef={ref => this.password_confirm = ref} />
				                        </div>
		    						: 	<div>
		    								<div className="color-grey mb-2">{getLang('Identifique-se para receber um e-mail com as instruções e o link para criar uma nova senha.')}</div>			
			    							<Input 
						                        required
						                        label="Email"
						                        inputRef={ref => this.email = ref} />
				                        </div>
		    					}
			    				
		                        <div className="row justify-content-center">
		                        	<div className="col-lg-8">
				                        <BtnMain
		                                    className="font-weight-bold btn-block"
		                                    onClick={this.recovery}
		                                    title="Salvar" />
                                    </div>
                                </div>
			    			</div>
		            	</div>
		            </div>
	            </div>
			</div>
        );
    }
}

export default Recovery