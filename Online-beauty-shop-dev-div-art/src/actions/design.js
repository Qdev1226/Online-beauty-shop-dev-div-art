import * as types from './types.js'
import { DEFAULT_IMG } from 'config'
import store from 'store'
import { addSwipe, removeSwipe } from 'utils'
import Cookies from 'js-cookie'

export const toggleSideMenu = state => {
    const el = document.getElementById('main-wrap')
    if (!state) {
        removeSwipe(el)
        el.removeEventListener('click', closeSideMenu)
        setTimeout(() => {
            el.style.overflowX = 'unset'
        }, 600)
    } else {
        addSwipe(el)
        el.addEventListener('click', closeSideMenu)
        el.style.overflowX = 'hidden'
    }
    return {
        type: types.TOGGLE_SIDE_MENU,
        state
    }
}

export const closeSideMenu = () => {
    store.dispatch(toggleSideMenu(false))
}

export const toggleLeftMenu = (state, body) => 
    ({
        type: types.TOGGLE_LEFT_MENU,
        state,
        body
    })

export const setLocation = location => 
    ({
        type: types.SET_LOCATION,
        location
    })

export const toggleModal = (open, content, className, title, data) => 
    ({
        type: types.TOGGLE_MODAL,
        open,
        content,
        className,
        title,
        data
    })

export const updateModal = updater => 
    ({
        type: types.UPDATE_MODAL,
        updater,
    })

export const setAlert = (text, level) =>
    ({
        type: types.SHOW_ALERT,
        text,
        level
    })

export const removeAlert = () =>
    ({
        type: types.REMOVE_ALERT
    })

export const toggleLinkList = value =>
    ({
        type: types.TOGGLE_LINK_LIST,
        value
    })

export const toggleLightBox = (open, img, current) =>
    ({
        type: types.TOGGLE_LIGHT_BOX,
        data: {img: img.length ? img : [DEFAULT_IMG, DEFAULT_IMG, DEFAULT_IMG, DEFAULT_IMG], open, current},
    })

export const setLanguage = value => {
    Cookies.set('lang', value)
    return {
        type: types.SET_LANGUAGE,
        value
    }
}