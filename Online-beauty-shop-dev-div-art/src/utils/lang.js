import store from 'store'
import * as list from 'config/lang.json'

export const getLang = val => {
	if (typeof val !== 'string') {
		return val
	}
	const key = Object.keys(list).find(item => item.toLowerCase() === val.toLowerCase())
	return key ? (store.getState().design.lang === 'br' ? key : list[key]) : val
}

export const getValue = () => {
	return store.getState().design.lang
}