import React, { Component } from 'react'
import WebSearch  from 'components/search'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnMain from 'components/buttons/btn_main'
import store, { history } from 'store'
import { setActiveCategory, getCategories } from 'actions'
import { toggleSideMenu } from 'actions/design'
import Tooltip from 'components/tooltip'
import CartHeader from 'components/cart/cart_header'
import { LoginForm, ZipForm } from 'components/forms'
import HeaderMenu from 'components/menu/header_menu'
import './style.css'
import { getLang } from 'utils/lang'

class Header extends Component {
    state = {
        dismissDownload: false,
        tooltip: false
    }

    handleDismissClick = () => {
        this.setState({ dismissDownload: true })
    }

    toggleSideMenu = state => e => {
        e.preventDefault()
        store.dispatch(toggleSideMenu(state))
    }

    closeTooltip = e => {
        if (! e.target.id && ! e.target.closest('#child')) {
            this.setState({tooltip: false})
            document.body.removeEventListener('click', this.closeTooltip)
        }
    }

    toggleTooltip = type => e => {
        e.stopPropagation()
        if (type === this.state.tooltip || ! e.target.id) {
            this.setState({tooltip: false})
            document.body.removeEventListener('click', this.closeTooltip)
        } else {
            this.setState({tooltip: type})
            document.body.addEventListener('click', this.closeTooltip)
        }
    }

    printLink = (item, i) => {
        if (i > 0) {
            return <span key={i} onClick={this.changePage(item)} className="text-white pointer text-nowrap px-1 header-link">{getLang(item.name)}</span>
        }
    }

    changePage = item => e => {
        history.push(`/category/service/${item.id}`)
        store.dispatch(setActiveCategory(item))
    }

    componentWillMount() {
        store.dispatch(getCategories())
    }

    render() {
        const contentTooltip = this.props.user.guest ? LoginForm : HeaderMenu
        const address = this.props.user.data.main_address ? this.props.user.data.main_address : this.props.user.data.address
        const { linkList } = this.props.design
        return (
            <div className="wrap-header">
                {  
                    ! this.state.dismissDownload 
                    ?   <div className="download-app-big d-sm-none">
                            <div className="d-block text-center text-white p-5">
                                <div className="form-group position-relative">
                                    <strong>{getLang('Use grátis o app do Visual Total')}</strong>
                                    <img src="/assets/icons/close-icon.png" onClick={this.handleDismissClick} className="img-icon" alt="" />
                                </div>
                                <div className="form-group">
                                    <span>{getLang('Descubra a melhor experiência na hora de comprar pela internet')}</span>
                                </div>
                                <BtnMain
                                    className="btn-block"
                                    title="Baixar" />
                            </div>
                        </div>
                    :   ''
                }
                <div className="bg-dark effect6 pb-lg-3">
                    <div className="container text-white pt-4">
                        <div className="row pb-3 d-sm-none">
                            <div className="col-6 align-self-end">
                                <Link to="/"><img src="/assets/images/logo.png" alt="" className="img-fluid logo" /></Link>
                            </div>
                            <div className="col-6 align-self-end text-right px-5">
                                <i className="fa fa-bars fa-2x" onClick={this.toggleSideMenu(!this.props.design.sideMenu)} aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-lg-7">
                                <div className="d-none d-sm-flex align-items-end justify-content-between mb-3 position-relative">
                                    <div className="position-absolute app-button d-none d-md-block d-lg-none">
                                        <BtnMain
                                            className="pt-2"
                                            onClick={() => history.push('/about')}
                                            title={<span><img src="/assets/icons/app-icon.png" alt="" className="img-fluid small-icon mr-2" />{getLang('Baixe grátis o app do Visual Total')}</span>} />
                                    </div>
                                    <Link to="/"><img src="/assets/images/logo.png" alt="" className="img-fluid" /></Link>
                                    { this.props.categories[linkList].map((item, i) => this.printLink(item, i)) }
                                </div>
                                <div className="form-group">
                                    <WebSearch />
                                </div>
                            </div>
                        
                            <div className="col-sm-12 col-lg-5">
                                <div className="row align-items-end h-100">
                                    <div className="d-none d-lg-block col-12 order-sm-first align-self-start text-right">
                                        <BtnMain
                                            className="pt-2"
                                            onClick={() => history.push('/about')}
                                            title={<span><img src="/assets/icons/app-icon.png" alt="" className="img-fluid small-icon mr-2" />{getLang('Baixe grátis o app do Visual Total')}</span>} />
                                    </div>
                                    <div onClick={this.toggleTooltip('cart')} id="cart" className="header-link-icon col col-sm-3 px-sm-0 form-group pointer"> {/*col-6 col-sm-3*/}
                                        <img src="/assets/icons/cart-icon.png" id="cart" className="img-icon-header align-middle" alt="" />
                                        <div className="align-middle d-inline-block pl-2" id="cart">
                                            {getLang('Meu')}<br />
                                            <strong id="cart">{getLang('Carrinho')}</strong>
                                        </div>
                                        { this.state.tooltip === 'cart' ? <div className="tooltip-background z-index-3"></div> : '' }
                                        {
                                            this.state.tooltip === 'cart'
                                            ?   <Tooltip title={getLang("Adicionado ao seu carrinho")} type="cart" content={CartHeader} close={() => this.setState({tooltip: false})} />
                                            :   ''
                                        }
                                    </div>
                                    <div onClick={this.toggleTooltip('login')} id="login" className="header-link-icon col px-sm-0 form-group pointer d-none d-sm-block">
                                        { this.state.tooltip === 'login' ? <div className="tooltip-background z-index-3"></div> : '' }
                                        {
                                            this.props.user.guest
                                            ?   <span id="login">{getLang('Bem vindo')}<br /><strong id="login">{getLang('Entre ou cadastre-se')}</strong></span>
                                            :   <span id="login">{getLang('Olá')}, {this.props.user.data.first_name}<br /><strong id="login">{getLang('Sejá bem-vindo')}</strong></span>
                                        }
                                        {
                                            this.state.tooltip === 'login'
                                            ?   <Tooltip content={contentTooltip} type="login" close={() => this.setState({tooltip: false})} />
                                            :   ''
                                        }
                                    </div>
                                    <div onClick={this.toggleTooltip('zip')} id="zip" className="header-link-icon col col-sm-5 px-lg-0 order-sm-first form-group pointer"> {/*col-12 col-sm-5*/}
                                        <img src="/assets/icons/pin-icon.png" id="zip" className="img-icon-header align-middle" alt="" />
                                        <div className="align-middle d-inline-block pl-2" id="zip">
                                            {getLang('Encontre serviços')}<br />
                                            <strong id="zip">{this.props.user.guest ? getLang('Selecionar endereço') : (Object.keys(address).length ? `${address.title} ${address.zipcode}`: getLang(`Selecione um endereço`))}</strong>
                                        </div>
                                        { this.state.tooltip === 'zip' ? <div className="tooltip-background z-index-3"></div> : '' }
                                        {
                                            this.state.tooltip === 'zip'
                                            ?   <Tooltip 
                                                    title={getLang("Adicionar CEP")} 
                                                    type="zip" content={ZipForm}
                                                    openAnother={type => this.setState({tooltip: type})} 
                                                    close={() => this.setState({tooltip: false})} />
                                            :   ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>
    ({
        user: {
            guest: state.user.guest,
            data: {
                first_name: state.user.data.first_name,
                address: state.user.data.address,
                main_address: state.user.data.main_address
            },
        },
        categories: state.categories,
        design: {
            sideMenu: state.design.sideMenu,
            linkList: state.design.linkList,
        }
    })

export default connect(
    mapStateToProps
)(Header)