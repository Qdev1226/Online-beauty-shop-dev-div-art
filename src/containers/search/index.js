import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { getSearch, setSearch } from 'actions'
import CardProduct from 'components/cards/product'
import CardService from 'components/cards/service'
import Badge from 'components/badge'
import { getParams, getSearchText } from 'utils'
import Pagination from 'components/pagination'
import { getLang } from 'utils/lang'

class Search extends Component {

    constructor() {
        super()
        history.listen((location, action) => {
            if (location.pathname === '/search') {
                this.search(location.hash)
            }
        })
    }

	printList = (item, i, type) => {
		const component = type === 'product' ? <CardProduct {...item} /> : <CardService {...item} />
        return <div key={i} className="col-md-6 col-lg-4 mb-3">{component}</div>
    }

    search = hash => {
        const params = getParams(hash.replace('#', ''))
        if (params.latitude && params.longitude) {
            params.latitude *= 1
            params.longitude *= 1
        }
        
        store.dispatch(setSearch({items: [], total_items: 0, page: 1, total_pages: 1}, 'products'))
        store.dispatch(setSearch({items: [], total_items: 0, page: 1, total_pages: 1}, 'services'))
        
        params.type.forEach(item => {
            store.dispatch(getSearch(item, {new_pagination: true, page_size: 6, ...params}))
        })
    }

    changePage = type => page => {
        const params = getParams(history.location.hash.replace('#', ''))
        if (params.latitude && params.longitude) {
            params.latitude *= 1
            params.longitude *= 1
        }

        store.dispatch(setSearch({items: [], total_items: 0, page: 1, total_pages: 1}, type))
        store.dispatch(getSearch([type], {new_pagination: true, page_size: 6, page: page, ...params}))
    }

    componentWillMount() {
        this.search(this.props.location.hash)
    }

    render() {
        const { products, services } = this.props.search
        return (
            <div className="bg-main font-avenir py-4">
    			<div className="container">
    				{
    					services.list.length
    					? 	<div>
    							<div className="d-flex justify-content-between align-items-center mb-3">
			    					<div><span className="fs-16">{getLang('Serviços')}</span>&nbsp;&nbsp;<Badge count={services.all} /></div>
								</div>
								<div className="row mb-4">
									{ services.list.map((item, i) => this.printList(item, i, 'service')) }
								</div>
                                 <Pagination 
                                    responsive={[{width: 1199, count: 15}, {width: 810, count: 12}, {width: 767, count: 10}, {width: 600, count: 6}, {width: 550, count: 5}, {width: 375, count: 3}]}
                                    onChange={this.changePage('services')}
                                    className="mb-2"
                                    total={services.total_pages} 
                                    active={services.page} />
    						</div>
    					: 	''
    				} {
    					products.list.length
    					?	<div>
    							<div className="d-flex justify-content-between align-items-center mb-3">
			    					<div><span className="fs-16">{getLang('Produtos')}</span>&nbsp;&nbsp;<Badge count={products.all} /></div>
								</div>
			    				<div className="row mb-4">
									{ products.list.map((item, i) => this.printList(item, i, 'product')) }
								</div>
                                <Pagination
                                    responsive={[{width: 1199, count: 15}, {width: 810, count: 12}, {width: 767, count: 10}, {width: 600, count: 6}, {width: 550, count: 5}, {width: 375, count: 3}]}
                                    onChange={this.changePage('products')} 
                                    total={products.total_pages} 
                                    active={products.page} />
    						</div>
    					: 	''
    				} {
                        ![...products.list, ...services.list].length
                        ?   <div className="row justify-content-center not-found-wrap">
                                <div className="col-xl-6 col-md-7 col-sm-10 col-12">
                                    <div className="font-avenir-light fs-38 mb-3">Ops... Não encontramos nenhum resultado para {getSearchText(this.props.location.hash)}.</div>
                                </div>
                            </div>
                        :   ''
                        
                    }
    			</div>
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        search: state.search,
    })

export default connect(
    mapStateToProps
)(Search)