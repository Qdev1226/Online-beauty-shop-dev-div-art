import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import CollapsedMenu from 'components/blocks/collapsed_menu'
import Stars from 'components/stars'
import { setActiveCategory, setFilters } from 'actions'
import RangeSlider from 'components/inputs/range_slider'
import { getProducts } from 'actions/products'
import { getServices } from 'actions/services'
import SmallSwitch from 'components/inputs/small_switch'
import { getLang } from 'utils/lang'

let initialState = {
    min_price: 0,
    max_price: 5000,
    min_rating: 0,
    min_vendor_rating: 0
}

class SearchMenuWeb extends Component {
    constructor(props) {
        super(props)
        this.state = props.search.filters
        history.listen((location, action) => {
            store.dispatch(setFilters(initialState))
        })
    }
    

	getCategories = () => 
		this.props.categories[`${this.props.type}_list`].map((item, i) => 
			<div className="py-1 color-grey pointer pl-4" onClick={this.changeCategory(item)} key={i}>{getLang(item.name)}</div>
		)

    getSubCategories = () => 
        this.props.categories.subcategories.map((item, i) => 
            <div className="py-2 color-grey pointer pl-4" key={i}>{getLang(item.name)}</div>
        )

	getRatings = type => {
		const list = Array.apply(null, Array(5))
        const func = type === 'min_rating' ? this.productsFilter : this.vendorFilter
		return list.map((item, i) => 
			(<div className="py-2 color-grey" key={i}>
                <SmallSwitch
                    className="d-inline-block"
                    onChange={func} 
                    value={i+1}
                    checked={this.state[type]} />
                <Stars wrapClass="pl-1" active={i+1} />
            </div>)
		).reverse()
	}

    getParam = param => {
        const temp = Object.assign({}, this.state)
        Object.keys(param).forEach(item => {
            temp[item] = param[item]
        })
        return temp
    }

    productsFilter = val => {
        val = this.state.min_rating === val ? 0 : val
        this.setState({min_rating: val})
        this.getData(this.props.type, this.props.catId, this.getParam({min_rating: val}))
        store.dispatch(setFilters({min_rating: val}))
    }

    vendorFilter = val => {
        val = this.state.min_vendor_rating === val ? 0 : val
        this.setState({min_vendor_rating: val})
        this.getData(this.props.type, this.props.catId, this.getParam({min_vendor_rating: val}))
        store.dispatch(setFilters({min_vendor_rating: val}))
    }

    changeCategory = category => e => {
        const [, seg1, seg2] = history.location.pathname.split('/')
        history.push(`/${seg1}/${seg2}/${category.id}`)
        store.dispatch(setActiveCategory(category))
    }

    getRangeSlider = () => {
        return  <div className="pl-4 py-2">
                    <div className="rounded border mb-2 color-grey px-2 py-1 d-inline-block">
                        R$ {this.state.min_price}
                        <sup><small>,00</small></sup> - 
                        R$ {this.state.max_price}
                        <sup><small>,00</small></sup>
                    </div>
                    <RangeSlider onChange={this.changeRange} onComplete={this.rangeComplete} value={{min: this.state.min_price, max: this.state.max_price}} min={0} max={5000} />
                </div>
    }

    rangeComplete = () => {
        this.getData(this.props.type, this.props.catId, this.getParam({min_price: this.state.min_price, max_price: this.state.max_price}))
        store.dispatch(setFilters({min_price: this.state.min_price, max_price: this.state.max_price}))
    }

    getData = (type, id, param) => {
        switch(type) {
            case 'product':
                store.dispatch(getProducts('pagination', {category: id, new_pagination: true, page_size: 14, ...param}))
                break
            case 'service':
                store.dispatch(getServices('pagination', {category: id, new_pagination: true, page_size: 14, ...param}))
                break
            default: return
        }
    }

    changeRange = value => {
        this.setState({
            min_price: value.min,
            max_price: value.max
        })
    }

    render() {
        return (
        	<div>
	            <h4>{getLang('Organizar anúncios')}</h4>
                <CollapsedMenu title={getLang("Faixa de preço")} body={this.getRangeSlider()} />
    			<CollapsedMenu title={getLang("Categoria")} body={this.getCategories()} />
                <CollapsedMenu title={getLang("Subcategoria")} body={this.getSubCategories()} />
    			<CollapsedMenu title={getLang("Marca")} body={<span></span>} />
    			<CollapsedMenu title={getLang("Estado")} body={<span></span>} />
    			<CollapsedMenu title={getLang("Provedor do serviço")} body={<span></span>} />
                <CollapsedMenu title={getLang("Promoção")} body={<span></span>} />
                <CollapsedMenu title={getLang("Avaliação do produto")} body={this.getRatings('min_rating')} />
    			<CollapsedMenu title={getLang("Avaliação do vendedor")} body={this.getRatings('min_vendor_rating')} />
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        categories: {
            product_list: state.categories.product_list,
            service_list: state.categories.service_list,
            subcategories: state.categories.subcategories
        },
        search: {
            filters: state.search.filters
        }
    })

export default connect(
    mapStateToProps
)(SearchMenuWeb)