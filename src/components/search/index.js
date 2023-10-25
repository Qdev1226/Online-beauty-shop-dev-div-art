import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import BtnMain from 'components/buttons/btn_main'
import { getAutocomplete, setSearchQuery, getAutocompleteSalon } from 'actions'
import './style.css'
import DropDownMenu from 'components/menu/drop_down_menu'
import Tooltip from 'components/tooltip'
import { getLang } from 'utils/lang'

class WebSearch extends Component {
	constructor(props) {
		super(props)
		history.listen((location, action) => {
			if (location.pathname !== '/search') {
	            this.setState({value: ''})
	        }
        })

        this.state = {
        	active: false,
        	value: ''
        }
	}

	setAutocomplete = e => {
		this.setState({value: e.target.value})
		if (!this.state.active) {
			this.setState({active: true})
			document.body.addEventListener('click', this.closeDropDown)
		}
		store.dispatch(setSearchQuery(e.target.value))
		store.dispatch(getAutocomplete(e.target.value))
		store.dispatch(getAutocompleteSalon(e.target.value))
	}

	handleOnChange = e => {
		this.setState({value: e.target.value})
	}

	closeDropDown = e => {
		if (! e.target.closest('#main-dropdown')) {
			this.setState({active: false})
			document.body.removeEventListener('click', this.closeDropDown)
		} else {
			this.query.focus()
		}
	}

	toggleDropDown = e => {
		e.stopPropagation()
		if (this.state.active) {
			document.body.removeEventListener('click', this.closeDropDown)
		} else {
			document.body.addEventListener('click', this.closeDropDown)
		}
		
		this.setState({active: !this.state.active})
	}

	search = e => {
		e.preventDefault()
		if (this.props.search.type === 'salons') {
			history.push(`/search#type=alls&search_text=&vendor=${this.state.value}`)
		} else {
			history.push(`/search#type=${this.props.search.type}&search_text=${this.state.value}`)
		}
		
	}

	getSearchType = () => {
		switch(this.props.search.type) {
			case 'products': return {title: 'Produto', placeholder: 'Buscar por produtos'}
			case 'services': return {title: 'Serviço', placeholder: 'Buscar por serviços'}
			case 'salons': return {title: 'Salão', placeholder: 'Buscar por salão'}
			case 'vendors': return {title: 'Vendedor', placeholder: 'Buscar por vendedor'}
			default: return {title: 'Todos', placeholder: 'Buscar por todos'}
		}
	}

    render() {
        return (
        	<div>
	            <form className="input-group d-none d-sm-flex" onSubmit={this.search}>
	            	<div className="input-group-prepend" id="main-dropdown">
					    <button type="button" onClick={this.toggleDropDown} className="btn btn-drop-search pl-3">
					    	{ getLang(this.getSearchType().title) }
					    	<i className="fas fa-chevron-down px-3"></i>
				    	</button>
				    	{
				    		this.state.active
				    		? 	<Tooltip type="menu" content={DropDownMenu} close={() => this.setState({active: false})} />
				    		: 	''
				    	}
				  	</div>
					<input 
						type="text"
						onChange={this.setAutocomplete}
						value={this.state.value}
						ref={ref => this.query = ref}
						className="form-control with-shadow border-0"
						placeholder={getLang(this.getSearchType().placeholder)} />
					<div className="input-group-append">
					    <BtnMain
					    	className="btn-search px-4 pt-2"
					    	type="submit"
					    	title={<i className="fa fa-search" aria-hidden="true"></i>} />
				  	</div>
				</form>
				<form className="input-group d-flex d-sm-none">
					<input 
						type="text"
						className="form-control with-shadow border-0 fs-13"
						value={this.state.value}
						onChange={this.handleOnChange}
						placeholder={getLang("Buscar por produtos e serviços")} />
					<div className="input-group-append">
					    <BtnMain
					    	className="btn-search px-4 pt-2"
					    	onClick={this.search}
					    	title={<i className="fa fa-search" aria-hidden="true"></i>} />
				  	</div>
				</form>
			</div>
        )
    }
}

const mapStateToProps = state =>
    ({ 
        search: {
            type: state.search.type,
        }
    })

export default connect(
    mapStateToProps
)(WebSearch)