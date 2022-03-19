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

    classroom: {
        list: API_URL + 'class-rooms',
    },

    // house: {
    //     list: API_URL + 'houses',
    // },

    parent: {
        list: API_URL + 'parents',
    },

    subject: {
        list: API_URL + 'subjects',
        delete: API_URL + 'subjects',
        add: API_URL + 'subjects',
		update: API_URL + 'subjects',
    },

    house: {
        list: API_URL + 'houses' +'?populate=*',
        delete: API_URL + 'houses',
        add: API_URL + 'houses'+'?populate=*',
		update: API_URL + 'houses',
    },

    teacher: {
        list: API_URL + 'teachers' +'?populate=*',
        delete: API_URL + 'teachers',
        add: API_URL + 'teachers',
		update: API_URL + 'teachers',
    },
}