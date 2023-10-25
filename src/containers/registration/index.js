import React, { Component } from 'react'
import SmallSwitch from 'components/inputs/small_switch'
import { RegistrationForm } from 'components/forms'

class Registration extends Component {
	state = {
		form: 'client'
	}

	toggleForm = value => {
		this.setState({
            form: value
        })
	}

    render() {
        return (
        	<div className="bg-main font-avenir pt-4">
        		<div className="container">
		            <div className="row">
		            	<div className="col-sm-6">
		            		<h4 className="mb-1">Cadastro</h4>
		            		<div className="color-grey mb-3">
			        			Complete seus dados para se cadastrar
			    			</div>
			    			<div className="rounded p-4 bg-white border mb-3">
			    				<h4>Tipo de usuário</h4>
			    				<div className="d-flex mb-3">
				    				<SmallSwitch
				    					onChange={this.toggleForm} 
		                                value="client"
		                                title="Pessoal"
		                                checked={this.state.form} />
	                                <SmallSwitch
	                                	className="pl-3"
				    					onChange={this.toggleForm} 
		                                value="vendor"
		                                title="Empresa"
		                                checked={this.state.form} />
                                </div>
                                <RegistrationForm type={this.state.form} />
			    			</div>
		            	</div>
		            </div>
	            </div>
			</div>
        );
    }
}

export default Registration