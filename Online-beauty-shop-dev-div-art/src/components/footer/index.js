import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { setLanguage } from 'actions/design'
import BtnMain from 'components/buttons/btn_main'
import { getLang } from 'utils/lang'

class Footer extends Component {
    setLanguage = e => {
        store.dispatch(setLanguage(e.target.value))
    }

    render() {
        return (
            <footer className="bg-dark text-white pt-3 font-avenir">
                <div className="container">
                    <div className="row text-center justify-content-center">
                        <div className="col-lg-5 col-md-6 col-sm-8">
                            <div className="mb-3">
                                <img src="/assets/images/LogoVisualTotal.png" className="img-fluid" alt="" />
                            </div>
                            <div className="mb-3">
                                <div className="row justify-content-center">
                                    <div className="col-10">
                                        <BtnMain
                                            className="btn-block"
                                            onClick={() => history.push('/about')}
                                            title={<span><img src="/assets/icons/app-icon.png" alt="" className="img-fluid small-icon mr-2" />{getLang('Baixe grátis o app do Visual Total')}</span>} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3 mb-sm-4 color-grey">
                        <div className="col-sm col-12">
                            <div className="mb-sm-3">{getLang('Quem somos')}</div>
                            <div className="mb-1">{getLang('Sobre o App')}</div>
                            <div className="mb-1">{getLang('Sobre o Blog')}</div>
                        </div>
                        <div className="col-sm col-12">
                            <div className="mb-sm-3 mb-1">{getLang('Vantagens para clientes')}</div>
                            <div className="mb-1">{getLang('Ofereça seus serviços')}</div>
                            <div className="mb-1">{getLang('Anuncie seus produtos')}</div>
                            <div className="border-bottom w-100 d-sm-none mb-3"></div>
                        </div>
                        <div className="col-sm col-12">
                            <div className="mb-3">{getLang('Localização')}</div>
                            <div className="mb-2">Rua Girassol, 1158 - Vila Madalena,<br className="d-sm-none" /> São Paulo - SP</div>
                            <div className="mb-1">Rua Girassol, 1158 - Vila Madalena,<br className="d-sm-none" /> São Paulo - SP</div>
                            <div className="border-bottom w-100 d-sm-none mb-3"></div>
                        </div>
                        <div className="col-sm col-12">
                            <div className="font-italic mb-3">{getLang('Conecte-se conosco')}</div>
                            <div className="font-italic mb-1">(55) +11 3003-0230</div>
                            <div className="font-italic mb-1">visualtotal@contato.com.br</div>
                            <div className="border-bottom w-100 d-sm-none mb-3"></div>
                        </div>
                        <div className="col-sm col-12">
                            <div className="mb-3"><strong>{getLang('Sobre a WeMind Group')}</strong></div>
                            <div className="mb-1">{getLang('Carreiras')}</div>
                            <div className="mb-1">{getLang('Conheça a WeMind')}</div>
                        </div>
                    </div>

                    <div className="row pb-3 align-items-end">
                        <div className="col-sm-6 text-right">
                            <div className="row align-items-end mb-3 mb-sm-0">
                                <div className="col-sm col-4 pr-0 text-xs-left">
                                    <img src="/assets/icons/facebook-icon.png" alt="" className="footer-icon mr-2" />
                                    <img src="/assets/icons/instagram-icon.png" alt="" className="footer-icon" />
                                </div>
                                <div className="col-sm col-8 text-left">
                                    <p className="color-grey">{getLang('Selecione um país/região')}</p>
                                    <select className="form-control h-75" onChange={this.setLanguage} defaultValue={this.props.design.lang}>
                                        <option value="br">Brasil - Português</option>
                                        <option value="en">EUA - English</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 order-sm-first color-grey">
                            <span className="footer-copyright">{getLang('Uma empresa WeMind Group')} - www.wemindgroup.com</span>
                        </div>
                    </div>
                    <div className="border-bottom mb-2 d-sm-none"></div>
                    <div className="pb-2 color-grey footer-copyright">© WeMind 2018 - {getLang('TODOS OS DIREITOS RESERVADOS.')}</div>
                </div>
            </footer>
        )
    }
}

const mapStateToProps = state =>
    ({
        design: {
            lang: state.design.lang
        }
    })

export default connect(
    mapStateToProps
)(Footer)
