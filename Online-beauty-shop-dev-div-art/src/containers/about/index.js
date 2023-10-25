import React, { Component } from 'react'
import store from 'store'
import { toggleModal } from 'actions/design'
import BtnMain from 'components/buttons/btn_main'
import { format } from 'utils/mask'
import { getLang } from 'utils/lang'

class About extends Component {
	state = {
		disabled: true
	}

	checkMask = (mask, field) => e => {
        this.phone.value = format(mask, e.target.value)
        this.setState({disabled: this.phone ? this.phone.value.length < 14 : true})
    }

    confirmApp = props => {
        return  <div className="text-center">
                    <div className="mb-3">Enviaremos um link para download, verifique o seu dispositivo</div>
                    <BtnMain
                        className="btn-block font-weight-bold"
                        onClick={() => props.onCancel()}
                        title="Finalizar" />
                </div>
    }

    sendApp = () => {
    	store.dispatch(toggleModal(true, this.confirmApp, 'modal-sm text-center', 'Enviado com successo', {position: 'center'}))
    }

    render() {
        return (
        	<div className="bg-main font-avenir about-wrap">
        		<div className="container inner-about d-flex align-items-center pt-2" style={{minHeight: 400}}>
        			<div className="row justify-content-center">
	        			<div className="col-xl-6 col-md-7 col-sm-10 col-12">
	        				<div className="row">
		        				<div className="col-xl-9 col-lg-9 col-md-12 mb-4">
				        			<div className="text-white font-avenir-light fs-38 mb-3">{getLang('Baixe grátis o app do')}<br />Visual Total</div>
				        			<div className="text-white mb-3">{getLang('Não importa onde você está: busque, compra e venda tudo o que quiser pelo seu celular.')}</div>
				        			<div className="d-flex align-items-center">
				        				<div className="w-40 pr-1 mr-2">
				        					<img src="/assets/images/google-play.png" alt="" className="img-fluid" />
			        					</div>
			        					<div className="w-40 pr-1">
				        					<img src="/assets/images/app-store.png" alt="" className="img-fluid" />
				        				</div>
				        			</div>
			        			</div>
		        			</div>
		        			
							<div className="d-flex mb-2 w-90">
								<div className="input-group pr-2">
									<div className="input-group-prepend">
										<span className="input-group-text bg-white">
											<img src="/assets/images/brasil.png" alt="" className="img-fluid img-icon-header" />
											&nbsp; [+55]
										</span>
									</div>
								  	<input 
								  		type="text" className="form-control" 
								  		onChange={this.checkMask('phone', 'phone')}
								  		placeholder={getLang("Seu número")}
			                            ref={ref => this.phone = ref} />
								</div>
								<BtnMain
									className="px-4"
									disabled={this.state.disabled}
									onClick={this.sendApp}
									title="Enviar" />
							</div>
							<div className="text-center px-5">
								{getLang('Para receber um link para baixar sem custo por SMS adicione o seu telefone')}
							</div>
						</div>
					</div>
        		</div>
			</div>
        );
    }
}

export default About