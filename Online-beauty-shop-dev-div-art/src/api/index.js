import * as config from 'config'
import Cookies from 'js-cookie'
import store from 'store'
import { setAlert } from 'actions/design'

let withMessage = false

const responseHandler = response => {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
        const promise = response.json()
        const ok = response.ok
        if (withMessage) {
            promise.then(response => {
                if (response.message) {
                    store.dispatch(setAlert(response.message, ok ? 'success' : 'error'))
                }
                withMessage = false
            })
        }
        return promise;
    }
}

const responseBlobHandler = response => {
    const contentType = response.headers.get('content-type')
    
    if (contentType && contentType.indexOf('application/pdf') !== -1) {
        const promise = response.blob()
        return promise
    }
}

const getHeader = () => 
    ({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        [config.APIKEY]: Cookies.get('token')
    })

export const get = (...data) => {
	const [url, alert = false] = data
	withMessage = alert
    return fetch(`${config.API_URL}/${url}`, {
        method: 'get',
        headers: getHeader(),
    })
    .then(responseHandler)
}

export const post = (...data) => {
	const [url, alert = false, body] = data
	withMessage = alert
    return fetch(`${config.API_URL}/${url}`, {
        method: 'post',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler)
}

export const put = (...data) => {
    const [url, alert = false, body] = data
    withMessage = alert
    return fetch(`${config.API_URL}/${url}`, {
        method: 'put',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler)
}

export const remove = (...data) => {
	const [url, alert = false] = data
	withMessage = alert
    return fetch(`${config.API_URL}/${url}`, {
        method: 'delete',
        headers: getHeader()
    })
    .then(responseHandler)
}

export const patch = (...data) => {
    const [url, alert = false, body] = data
    withMessage = alert
    return fetch(`${config.API_URL}/${url}`, {
        method: 'patch',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler)
}

export const image = (...data) => {
    const [url, alert = false, body] = data
    withMessage = alert
    return fetch(`${config.API_URL}/${url}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            [config.APIKEY]: Cookies.get('token')
        },
        body: body
    })
    .then(responseHandler)
}

export const loadPDF = (url) => {
    return fetch(`${url}`, {
        method: 'get',
        headers: {
            [config.APIKEY]: Cookies.get('token')
        },
    })
    .then(responseBlobHandler)
}