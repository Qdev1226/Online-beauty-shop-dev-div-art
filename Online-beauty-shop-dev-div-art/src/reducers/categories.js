import * as types from 'actions/types.js'

const initialState = {
    product: [],
    service: [],
    active: 'product',
    product_list: [],
    service_list: [],
    active_category: {},
    subcategories: []

}

export default function categories(categories = initialState, action = {}) {
    let temp = Object.assign({}, categories)
    switch (action.type) {
        case types.SET_CATEGORIES:
            return Object.assign({}, categories, {
                product: action.data.productCategories,
                service: action.data.serviceCategories
            });
        case types.SET_SUB_CATEGORIES:
            return Object.assign({}, categories, {
                subcategories: action.data.subcategories,
            });
        case types.SET_CATEGORY:
            return Object.assign({}, categories, {
                [action.key]: action.data,
            });
        case types.SET_CATEGORY_LIST:
            const active_category = action.data.find(item => item.id === action.id * 1)
            return Object.assign({}, categories, {
                [`${action.key}_list`]: action.data,
                active_category
            });
        case types.SET_ACTIVE_CATEGORY:
            return Object.assign({}, categories, {
                active_category: action.cat
            });
        case types.SET_SERVICE_CATEGORY:
            temp.service.find(item => item.id === action.catId).list = action.data
            return Object.assign({}, categories, {
                temp
            });
        default:
            return categories;
    }
}