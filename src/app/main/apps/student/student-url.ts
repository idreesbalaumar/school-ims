import { API_URL } from "app/services/app-config";

export let studentUrl = {
    student: {
        list: API_URL + 'students' +'?populate=*',
        add: API_URL + 'students',
		update: API_URL + 'students',
    },
}