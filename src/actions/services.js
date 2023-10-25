import * as types from './types.js'
import { post, get } from 'api'
import { setScheduleCartKey } from 'actions/schedule_cart'

export const getServices = (type, param) => dispatch => 
    (
        post('api/services', false, param).then(json => {
            if (json.object) {
                dispatch(setServices(json.object, type))
            }
        })
    )

export const getService = id => dispatch => 
    (
        get(`api/service/${id}/salon`, false).then(json => {
            if (json.object) {
                dispatch(setServices(json.object, 'salon'))
                return true
            }
        })
    )

export const getVendorServices = id => dispatch => 
    (
        get(`api/services/vendor/${id}`, false).then(json => {
            if (json.object) {
                dispatch(setVendorServices(json.object))
            }
        })
    )

/*export const getProffesionalHours = id => dispatch => 
    (
        get(`api/professional/${id}/working-hours`, false).then(json => {
            if (json.object) {
                console.log(json.object)
            }
        })
    )*/

export const getServicesCategory = param => dispatch => 
    (
        post('api/services', false, param).then(json => {
            if (json.object) {
                dispatch(setServiceCategory(param.category, json.object))
            }
        })
    )

export const sendSalonComment = (data, id) => dispatch =>
    (
        post(`api/vendor/${id}/review`, true, data)
        .then(json => json.status === 200)
    )

export const setServices = (data, key) => 
    ({
        type: types.SET_SERVICES,
        data,
        key
    })

export const setServiceCategory = (catId, data) => 
    ({
        type: types.SET_SERVICE_CATEGORY,
        catId,
        data
    })

export const getTempVoucher = id => dispatch => 
    (
        get(`api/service/${id}/voucher`, false).then(json => {
            if (json.object) {
                dispatch(setScheduleCartKey(json.object, 'voucher'))
            }
        })
    )

export const getAvailableTimes = (id, dateFrom, dateTo) => dispatch => 
    (
        get(`api/schedules/${dateFrom}/${dateTo}/${id}`, false).then(json => {
            if (json.object) {
                dispatch(setProfessionals(json.object))
            }
        })
    )

export const setVendorServices = data => 
    ({
        type: types.SET_VENDOR_SERVICES,
        data
    })

export const setProfessionals = data => 
    ({
        type: types.SET_PROFESSIONALS,
        data
    })