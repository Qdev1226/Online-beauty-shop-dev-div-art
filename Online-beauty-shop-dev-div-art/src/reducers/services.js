import * as types from 'actions/types.js'

const initialState = {
    list: [],
    pagination: {
    	items: [],
    	page: 1,
    	total_pages: 1
    },
    salon: {
        address: {},
        social_media: [],
        reviews: [],
        professionals: [],
        working_hours: {}
    }
}

export default function services(services = initialState, action = {}) {
    switch (action.type) {
        case types.SET_SERVICES:
            return Object.assign({}, services, {
                [action.key]: action.data
            });
        default:
            return services;
    }
}