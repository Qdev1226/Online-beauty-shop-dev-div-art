import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { setSearchType } from 'actions'
import { DROP_MENU_LIST } from 'config'
import './style.css'
import { getLang } from 'utils/lang'

class DropDownMenu extends Component {
	setSearch = type => e => {
		e.stopPropagation()
		store.dispatch(setSearchType(type))
		this.props.close()
	}

	setResult = type => {
		if (this.props.search.autocomplete[type] && this.props.search.autocomplete[type].length && this.props.search.query.length) {
			const start = this.props.search.autocomplete[type][0].toLowerCase().indexOf(this.props.search.query.toLowerCase())
			const finish = start + this.props.search.query.length

			return 	<div className="px-3 text-truncate">
						<span>{this.props.search.autocomplete[type][0].slice(0, start)}</span>
						<strong>{this.props.search.autocomplete[type][0].slice(start, finish)}</strong>
						<span>{this.props.search.autocomplete[type][0].slice(finish)}</span>
					</div>
		}
	}

	setResultSalon = () => {
		if (this.props.search.autocompleteSalon.length && this.props.search.query.length) {
			const start = this.props.search.autocompleteSalon[0].toLowerCase().indexOf(this.props.search.query.toLowerCase())
			const finish = start + this.props.search.query.length
			
			return 	<div className="px-3 text-truncate">
						<span>{this.props.search.autocompleteSalon[0].slice(0, start)}</span>
						<strong>{this.props.search.autocompleteSalon[0].slice(start, finish)}</strong>
						<span>{this.props.search.autocompleteSalon[0].slice(finish)}</span>
					</div>
		}
	}

	printList = (item, i) =>
		(<div key={i} className="py-2 d-flex pointer wrap-drop-search" onClick={this.setSearch(`${item.type}s`)}>
   			<div className={`ml-3 text-white text-uppercase px-0 pt-0 pb-0 btn w-15 drop-search-item ${item.background}`} style={{minWidth: 95}}>{getLang(item.title)}</div>
   			<div className="w-85">{item.type === 'salon' ? this.setResultSalon() : this.setResult(item.type)}</div>
       	</div>)

    render() {
        return (
        	<div className="font-avenir-light">
        		{ DROP_MENU_LIST.map((item, i) => this.printList(item, i)) }
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({ 
        search: {
            autocomplete: state.search.autocomplete,
            autocompleteSalon: state.search.autocompleteSalon,
            query: state.search.query
        }
    })

export default connect(
    mapStateToProps
)(DropDownMenu)