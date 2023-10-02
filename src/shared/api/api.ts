import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage'

export const URL = process.env.REACT_APP_API_HOST

export const $api = axios.create({
	baseURL: URL,
	headers: {
		authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY),
	},
	validateStatus: function (status) {
		return status >= 200 && status < 500
	},
})
