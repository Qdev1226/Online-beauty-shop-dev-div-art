import * as types from 'actions/types.js'
import { DEFAULT_IMG } from 'config'
import Cookies from 'js-cookie'

const initialState = {
    lang: Cookies.get('lang') || 'br',
    sideMenu: false,
    leftMenu: {
        state: false,
        body: null
    },
    alerts: {
        messages: []
    },
    modal: {
    	open: false,
    	content: null,
        className: '',
        title: '',
        data: {},
        updater: ''
    },
    linkList: 'product',
    location: '/',
    lightbox: {
        current: 0,
        img: [DEFAULT_IMG, DEFAULT_IMG, DEFAULT_IMG, DEFAULT_IMG],
        open: false,
    },
    blogs: [],
    feedbacks: []
}

export default function design(design = initialState, action = {}) {
    let tempModal = Object.assign({}, design.modal)
    switch (action.type) {
        case types.TOGGLE_SIDE_MENU:
            return Object.assign({}, design, {
                sideMenu: action.state
            });
        case types.TOGGLE_LEFT_MENU:
            return Object.assign({}, design, {
                leftMenu: {
                    state: action.state,
                    body: action.body
                }
            });
        case types.TOGGLE_MODAL:
            return Object.assign({}, design, {
               modal: {open: action.open, content: action.content, className: action.className, title: action.title, data: action.data}
            });
        case types.UPDATE_MODAL:
            tempModal.updater = action.updater
            return Object.assign({}, design, {
               modal: tempModal
            });
        case types.SET_LOCATION:
            return Object.assign({}, design, {
               location: action.location
            });
        case types.SET_LANGUAGE:
            return Object.assign({}, design, {
               lang: action.value
            });
        case types.SHOW_ALERT:
            let tempMessages = Object.assign([], design.alerts.messages)
            tempMessages.push({ 'text': action.text, 'level': action.level })

            return Object.assign({}, design, {
                alerts: {
                    messages: tempMessages
                }
            });
        case types.REMOVE_ALERT:
            return Object.assign({}, design, {
                alerts: {
                    messages: []
                }
            });
        case types.TOGGLE_LIGHT_BOX:
            const tempLightbox = Object.assign([], design.lightbox)
            Object.keys(action.data).forEach(item => {
                if (action.data[item] !== undefined) {
                    tempLightbox[item] = action.data[item]
                }
            })
            return Object.assign({}, design, {
                lightbox: tempLightbox
            });
        case types.TOGGLE_LINK_LIST:
            return Object.assign({}, design, {
                linkList: action.value
            });
        case types.SET_BLOGS:
            return Object.assign({}, design, {
                blogs: action.data
            });
        case types.SET_FEEDBACKS:
            return Object.assign({}, design, {
                feedbacks: action.data
            });
        default:
            return design;
    }
}