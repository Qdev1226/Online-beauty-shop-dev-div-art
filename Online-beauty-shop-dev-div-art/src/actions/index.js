import { get, post, remove } from 'api'
import * as types from './types.js'
import { getWishlist, setUserKey } from 'actions/user'

export const getCategories = () => dispatch => 
    (
        get(`api/categories`).then(json => {
            if (json.object) {
                dispatch(setCategories(json.object))
                return json.object
            }
        })
    )

export const getSubCategories = (type, catId) => dispatch => 
    (
        get(`api/categories/${type}/${catId}/subcategories`).then(json => {
            if (json.object) {
                dispatch(setSubCategories(json.object))
            }
        })
    )

export const getCategoriesByType = type => dispatch => 
    (
        get(`api/categories/${type}`).then(json => {
            if (json.object) {
                return json.object
            }
        })
    )

export const getCategoryList = (param, id) => dispatch => 
    (
        get(`api/categories/${param}`).then(json => {
            if (json.object) {
                dispatch(setCategoryList(json.object, param, id))
                return id
            }
        })
    )

export const addToWishList = (type, id) => dispatch => 
    (
        post(`api/wishlist/add/${type}/${id}`, true)
    )

export const removeFromWishList = (type, id) => dispatch => 
    (
        remove(`api/wishlist/remove-item/${type}/${id}`, true).then(json => {
            dispatch(getWishlist(`${type}s`))
        })
    )

export const getBlogs = () => dispatch => 
    (
        get(`api/blog/posts`).then(json => {
            if (json.object) {
                dispatch(setBlogs(json.object))
            }
        })
    )

export const getFeedbacks = () => dispatch => 
    (
        get(`api/feedbacks`).then(json => {
            if (json.object) {
                dispatch(setFeedbacks(json.object))
            }
        })
    )

export const getLocation = zipcode => dispatch => 
    (
        get(`api/location/geocode?zipcode=${zipcode}`).then(json => {
            if (json.object) {
                dispatch(setUserKey(json.object, 'location'))
                return true
            }
        })
    )

export const getSearch = (type, param) => dispatch => 
    (
        post(`api/${type}`, false, param).then(json => {
            if (json.object) {
                dispatch(setSearch(json.object, type))
            }
        })
    )

export const getAutocomplete = search_text => dispatch => 
    (
        post(`api/search`, false, {search_text}).then(json => {
            if (json.object) {
                dispatch(setAutocomplete(json.object))
            }
        })
    )

export const getAutocompleteSalon = search_text => dispatch => 
    (
        post(`api/vendors`, false, {search_text}).then(json => {
            if (json.object) {
                dispatch(setAutocompleteSalon(json.object))
            }
        })
    )

export const cancelAppointment = id => dispatch => 
    (
        post(`api/appointment/${id}/cancel`, true)
        .then(json => json.status === 200)
    )

export const setCategoryList = (data, key, id) => 
    ({
        type: types.SET_CATEGORY_LIST,
        data,
        key,
        id
    })

export const setCategories = data => 
    ({
        type: types.SET_CATEGORIES,
        data
    })

export const setSubCategories = data => 
    ({
        type: types.SET_SUB_CATEGORIES,
        data
    })

export const setCategory = (data, key) => 
    ({
        type: types.SET_CATEGORY,
        data,
        key
    })

export const setActiveCategory = cat => 
    ({
        type: types.SET_ACTIVE_CATEGORY,
        cat
    })

export const setSearch = (data, key) => 
    ({
        type: types.SET_SEARCH,
        data: {
            list: data.items,
            all: data.total_items,
            page: data.page,
            total_pages: data.total_pages
        },
        key
    })

export const setAutocomplete = data => 
    ({
        type: types.SET_AUTOCOMPLETE,
        data
    })

export const setAutocompleteSalon = data => 
    ({
        type: types.SET_AUTOCOMPLETE_SALON,
        data
    })

export const setBlogs = data => 
    ({
        type: types.SET_BLOGS,
        data
    })

export const setFeedbacks = data => 
    ({
        type: types.SET_FEEDBACKS,
        data
    })

export const setFilters = data => 
    ({
        type: types.SET_FILTERS,
        data
    })

export const setSearchType = value => 
    ({
        type: types.SET_SEARCH_TYPE,
        value
    })

export const setSearchQuery = value => 
    ({
        type: types.SET_SEARCH_QUERY,
        value
    })