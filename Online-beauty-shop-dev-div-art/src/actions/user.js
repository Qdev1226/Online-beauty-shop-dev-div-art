import { put, get, post, patch, remove, image, loadPDF } from 'api'
import * as types from './types'
import { setUser } from './auth'
import { setDeliveryTypes } from './cart'

export const updateUser = data => dispatch => 
    (
        put('api/user/edit', true, data).then(json => {
            if (json.object) {
                dispatch(setUser(json.object))
                return true
            }
        })
    )

export const changePassword = data => dispatch => 
    (
        put('api/user/password', true, data)
        .then(json => json.status === 200)
    )

export const saveAvatar = data => dispatch => 
    (
        image('api/user/image', true, data).then(json => {
            if (json.object) {
                dispatch(setUserAvatar(json.object.image_name))
            }
        })
    )

export const getCreditCards = () => dispatch => 
    (
        get('api/user/creditcards').then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object, 'cards'))
                const default_card = json.object.find(item => item.default_card) || {}
                dispatch(setUserKey(default_card, 'default_card'))
            }
        })
    )

export const getWishlist = type => dispatch => 
    (
        get(`api/wishlist/${type}`).then(json => {
            if (json.object) {
                const obj = type === 'products' ? 'product' : 'service'
                const temp = json.object.map(item => {
                    item[obj].in_wishlist = true
                    return item
                })
                dispatch(setUserKey({[type]: temp}, 'wishlist'))
            }
        })
    )

export const getUserAddress = () => dispatch => 
    (
        get(`api/user/main-address`).then(json => {
            if (json.object) {
                dispatch(setUserAddress(json.object))
            }
        })
    )

export const getUserAddresses = () => dispatch => 
    (
        get(`api/user/addresses`).then(json => {
            if (json.object) {
                dispatch(setUserAddresses(json.object))
            }
        })
    )

export const saveAddress = data => dispatch => 
    (
        post(`api/user/address/add`, true, data).then(json => {
            if (json.object) {
                dispatch(addAddress(json.object))
                return true
            }
        })
    )

export const updateAddress = data => dispatch => 
    (
        put(`api/user/address/${data.id}`, true, data).then(json => {
            if (json.object) {
                dispatch(getUserAddresses())
                return true
            }
        })
    )

export const removeAddress = id => dispatch => 
    (
        remove(`api/user/address/${id}`, true).then(json => {
            dispatch(getUserAddresses())
        })
    )

export const calcDelivery = id => dispatch => 
    (
        get(`api/cart/delivery/${id}`).then(json => {
            if (json.object) {
                dispatch(setDeliveryTypes(json.object))
                return true
            }
        })
    )

export const toggleDefaultAddress = (id, state) => dispatch => 
    (
        put(`api/user/address/${id}`, true, {default: state}).then(json => {
            dispatch(getUserAddresses())
            dispatch(getUserAddress())
        })
    )

export const saveCard = data => dispatch => 
    (
        post(`api/user/creditcard/add`, true, data).then(json => {
            if (json.object) {
                dispatch(addCard(json.object))
                return true
            }
        })
    )

export const removeCreditCard = id => dispatch => 
    (
        remove(`api/user/creditcard/${id}`, true).then(json => {
            dispatch(getCreditCards())
        })
    )

export const toggleDefaultCard = id => dispatch => 
    (
        patch(`api/user/creditcard/default/${id}`).then(json => {
            if (json.object) {
                dispatch(getCreditCards())
            }
        })
    )

export const getCredits = () => dispatch => 
    (
        get(`api/credits`).then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object.total, 'credits'))
                dispatch(setUserKey(json.object.dollar_value, 'dollar_value'))
            }
        })
    )

export const getBundles = () => dispatch => 
    (
        get(`api/credit-bundles`).then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object, 'credits_bundles'))
            }
        })
    )

export const sendCredits = data => dispatch => 
    (
        post(`api/credits/transfer`, true, data)
        .then(json => json.status === 200)
    )

export const getAppointments = () => dispatch => 
    (
        post(`api/appointments`, false, {search_text: ''}).then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object, 'appointments'))
            }
        })
    )

export const getVouchers = () => dispatch => 
    (
        post(`api/user/vouchers`, false, {search_text: ''}).then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object, 'vouchers'))
            }
        })
    )

export const sendVoucher = data => dispatch => 
    (
        post(`api/user/voucher/transfer`, true, data).then(json => {
            if (json.status === 200) {
                dispatch(getVouchers())
                return true
            }
        })
    )

export const getNotifications = () => dispatch => 
    (
        get(`api/notifications`).then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object, 'notifications'))
            }
        })
    )

export const getReviewsProduct = () => dispatch => 
    (
        get(`api/user/reviews/products`).then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object.items, 'reviews_product'))
            }
        })
    )

export const getReviewsVendor = () => dispatch => 
    (
        get(`api/user/reviews/vendors`).then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object.items, 'reviews_vendor'))
            }
        })
    )

export const tempRemoveNotify = id => dispatch =>
    (
        post(`api/notification/${id}/remind-later`, true).then(json => {
            console.log(json)
        })
    )

export const removeNotify = id => dispatch =>
    (
        post(`api/notification/${id}/dismiss`, true)
        .then(json => json.status === 200)
    )

export const getPurchases = () => dispatch => 
    (
        get(`api/user/purchases`, false).then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object, 'purchases'))
            }
        })
    )

export const sendSupport = data => dispatch => 
    (
        post(`support/requests`, true, data).then(json => {
            console.log(json)
            if (json.object) {
                
            }
        })
    )

export const loadOrder = url => dispatch =>
    (
        loadPDF(url).then(blob => {
            if (blob) {
                return new Blob([blob], {type: 'application/pdf'})
            }   
            
        })
    )

export const setUserAddress = data => 
    ({
        type: types.SET_USER_ADDRESS,
        data
    })

export const setUserAddresses = data => 
    ({
        type: types.SET_USER_ADDRESSES,
        data
    })

export const addAddress = data => 
    ({
        type: types.ADD_ADDRESS,
        data
    })

export const addCard = data => 
    ({
        type: types.ADD_CARD,
        data
    })
    
export const setUserKey = (data, key) => 
    ({
        type: types.SET_USER_KEY,
        data,
        key
    })

export const setUserAvatar = image => 
    ({
        type: types.SET_USER_AVATAR,
        image
    })