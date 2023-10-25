import { toggleSideMenu } from 'actions/design'
import store from 'store'

var xDown = null;                                                        
var yDown = null;

export const getParams = hash => {
        let params = {
            type: []
        }
        hash.split('&').forEach(item => { 
            const [key, value] = item.split('=')
            key === 'type' ? params[key] = (value === 'alls' ? ['products', 'services', 'vendors'] : [value]) : params[key] = decodeURIComponent(value)
        })
        return params
    }

export const getSearchText = hash =>
	hash.replace('#', '').split('&').map(item => {
		const [key, value] = item.split('=')
		return key === 'search_text' ? value : ''
	})

export const removeSwipe = el => {
    el.removeEventListener('touchstart', initSwipe)
    el.removeEventListener('touchmove', handleSwipe)
}

export const addSwipe = el => {
    el.addEventListener('touchstart', initSwipe)
    el.addEventListener('touchmove', handleSwipe)
}

export const getDistance = (lat1, lon1, lat2, lon2) => {
    let radlat1 = Math.PI * lat1/180
    let radlat2 = Math.PI * lat2/180
    let theta = lon1-lon2
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    return `${(dist * 1.609344).toFixed(1)} km`
}

export const getMyPosition = callback => {
    navigator.geolocation.getCurrentPosition(pos => {
        callback({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
        })
    }, callback, {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true})
}

export const getStepsCount = () => {
    const cartList = store.getState().cart.list
    return cartList.product.length || (! cartList.product.length && ! cartList.service.length && ! cartList.credit_bundle.length) ? 5 : 4
}

const initSwipe = e => {
    xDown = e.touches[0].clientX
    yDown = e.touches[0].clientY
}

const handleSwipe = e => {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = e.touches[0].clientX;                                    
    var yUp = e.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
        } else {
            store.dispatch(toggleSideMenu(false))
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;
}