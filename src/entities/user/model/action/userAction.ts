import axios from 'axios'
import { Dispatch } from 'redux'
import { URL } from 'shared/api/api'
import { UserAction, UserActionTypes } from '../types/user'

export const fetchUsers = () => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			dispatch({ type: UserActionTypes.FETCH_USERS })
			console.log(URL)

			const response = await axios.get(`${URL}/user`)

			dispatch({
				type: UserActionTypes.FETCH_USERS_SUCCESS,
				payload: response.data,
			})
		} catch (e) {
			dispatch({
				type: UserActionTypes.FETCH_USERS_ERROR,
				payload: 'Произошла ошибка при загрузке пользователей',
			})
		}
	}
}
