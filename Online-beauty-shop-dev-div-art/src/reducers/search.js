import * as types from 'actions/types.js'

const initialState = {
    products: {
        all: 0,
        list: [],
        page: 1,
        total_pages: 1,
    },
    services: {
        all: 0,
        list: [],
        page: 1,
        total_pages: 1,
    },
    filters: {
        min_price: 0,
        max_price: 5000,
        min_rating: 0,
        min_vendor_rating: 0
    },
    type: 'alls',
    query: '',
    autocomplete: {
        product: [],
        service: []
    },
    autocompleteSalon: []
}

export default function search(search = initialState, action = {}) {
    switch (action.type) {
        case types.SET_SEARCH:
            return Object.assign({}, search, { 
                [action.key]: action.data,
            })
        case types.SET_FILTERS:
            const filters = Object.assign({}, search.filters)
            Object.keys(action.data).forEach(item => {
                filters[item] = action.data[item]
            })
            return  Object.assign({}, search, {filters})
        case types.SET_SEARCH_QUERY:
            return Object.assign({}, search, { 
                query: action.value
            })
        case types.SET_AUTOCOMPLETE:
            return  Object.assign({}, search, { 
                autocomplete: {
                    product: action.data.filter(item => item.product).map(item => item.product.name),
                    service: action.data.filter(item => item.service).map(item => item.service.title),
                }
            })
        case types.SET_AUTOCOMPLETE_SALON:
            return Object.assign({}, search, { 
                autocompleteSalon: action.data.map(item => item.organization_name)
            })
        case types.SET_SEARCH_TYPE:
            return  Object.assign({}, search, { 
                type: action.value
            })
        default:
            return search;
    }
}