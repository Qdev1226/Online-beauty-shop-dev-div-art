import * as types from 'actions/types.js'

const initialState = {
    list: [],
    category_list: [],
    product: {},
    reviews: [],
    questions: [],
    promotions: [],
    salon: {
        address: {},
        social_media: [],
        reviews: []
    },
    vendor_services: [],
    pagination: {
        items: [],
        page: 1,
        total_pages: 1
    }
}

export default function products(products = initialState, action = {}) {
	let temp =  Object.assign({}, products)
    switch (action.type) {
        case types.SET_PRODUCTS:
            return Object.assign({}, products, {
                [action.key]: action.data
            });
        case types.SET_PRODUCT:
        	temp.product = action.data.product
        	temp.salon = action.data.salon
            return Object.assign({}, products, temp);
        case types.SET_VENDOR_SERVICES:
            let vendor_services = []
            
            action.data.forEach(item => {
                let catKey = 0
                const cat = vendor_services.find((i, key) => {
                    catKey = key
                    return i.id === item.category.id
                })

                cat ? vendor_services[catKey].list.push(item) : vendor_services.push({id: item.category.id, name: item.category.name, list: [item]})
            })

            return Object.assign({}, products, {
                vendor_services
            });
        case types.SET_PRODUCT_COMMENTS:
            return Object.assign({}, products, {reviews: action.data.items});
        case types.SET_PRODUCT_PROMOTIONS:
            return Object.assign({}, products, {promotions: action.data});
        default:
            return products;
    }
}