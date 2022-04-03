import { API_URL } from "app/services/app-config";

export let generalUrl = {
    gender: {
        list: API_URL + 'genders',
    },

    state: {
        list: API_URL + 'states' +'?populate=lgas',
    },

    lga: {
        list: API_URL + 'lgas',
    },

    classcategory: {
        list: API_URL + 'class-categories',
    },

    class: {
        list: API_URL + 'classes',
    },

    // classroom: {
    //     list: API_URL + 'class-rooms',
    // },

    // house: {
    //     list: API_URL + 'houses',
    // },

    parent: {
        list: API_URL + 'parents',
    },

    academicsession: {
        list: API_URL + 'sessions',
        delete: API_URL + 'sessions',
        add: API_URL + 'sessions',
		update: API_URL + 'sessions',
    },

    sessionterm: {
        list: API_URL + 'session-terms',
        delete: API_URL + 'session-terms',
        add: API_URL + 'session-terms',
		update: API_URL + 'session-terms',
    },

    term: {
        list: API_URL + 'terms',
        delete: API_URL + 'terms',
        add: API_URL + 'terms',
		update: API_URL + 'terms',
    },

    subject: {
        list: API_URL + 'subjects',
        delete: API_URL + 'subjects',
        add: API_URL + 'subjects',
		update: API_URL + 'subjects',
    },

    grade: {
        list: API_URL + 'grades',
        delete: API_URL + 'grades',
        add: API_URL + 'grades',
		update: API_URL + 'grades',
    },

    house: {
        list: API_URL + 'houses' +'?populate=*',
        delete: API_URL + 'houses',
        add: API_URL + 'houses'+'?populate=*',
		update: API_URL + 'houses',
    },

    classroom: {
        list: API_URL + 'class-rooms' +'?populate=*',
        delete: API_URL + 'class-rooms',
        add: API_URL + 'class-rooms'+'?populate=*',
		update: API_URL + 'class-rooms',
    },

    teacher: {
        list: API_URL + 'teachers' +'?populate=*',
        delete: API_URL + 'teachers',
        add: API_URL + 'teachers',
		update: API_URL + 'teachers',
    },
}