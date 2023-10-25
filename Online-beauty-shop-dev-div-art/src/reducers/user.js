import * as types from 'actions/types.js'
import Cookies from 'js-cookie'

const initialState = {
    token: Cookies.get('token'),
    guest: Cookies.get('guest') === 'true',
    approve_token: false,
    data: {
        main_address: {},
        address: {},
        addresses: [],
        billing_addresses: [],
        user_image: {}
    },
    cards: [],
    default_card: {},
    wishlist: {
        products: [],
        services: []
    },
    appointments: [],
    purchases: [],
    vouchers: [],
    notifications: [],
    credits: 0,
    dollar_value: 0,
    credits_bundles: [],
    reviews_product: [],
    reviews_vendor: [],
    location: {
        lat: 0,
        lng: 0
    }
}

export default function user(user = initialState, action = {}) {
    let temp = Object.assign([], user.data)
    switch (action.type) {
        case types.SET_TOKEN:
            return Object.assign({}, user, {
                token: action.value,
                guest: action.guest,
                approve_token: true
            });
        case types.SET_USER_KEY:
            return Object.assign({}, user, {
                [action.key]: action.data
            });
        case types.SET_USER:
            return Object.assign({}, user, {
                data: action.data
            });
        case types.SET_USER_ADDRESS:
            temp.main_address = action.data
            return Object.assign({}, user, {
                data: temp
            });
        case types.SET_USER_ADDRESSES:
            temp.addresses = action.data
            return Object.assign({}, user, {
                data: temp
            });
        case types.ADD_ADDRESS:
            temp.addresses = [...temp.addresses, action.data]
            return Object.assign({}, user, {
                data: temp
            });
        case types.ADD_CARD:
            return Object.assign({}, user, {
                cards: [...user.cards, action.data]
            });
        case types.SET_USER_AVATAR:
            temp.user_image = action.image
            return Object.assign({}, user, {
                data: temp
            });
        default:
            return user;
    }
}