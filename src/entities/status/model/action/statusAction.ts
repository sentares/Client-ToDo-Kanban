import axios from 'axios'
import { Dispatch } from 'redux'
import { StatusActionsTypes, StatusesActions } from '../types/status'
import { URL } from 'shared/api/api'

export const fetchStatuses = () => {
	return async (dispatch: Dispatch<StatusesActions>) => {
		try {
			dispatch({ type: StatusActionsTypes.FETCH_STATUSES })
			const response = await axios.get(`${URL}/status`)

			dispatch({
				type: StatusActionsTypes.FETCH_STATUSES_SUCCESS,
				payload: response.data,
			})
		} catch (e) {
			dispatch({
				type: StatusActionsTypes.FETCH_STATUSES_ERROR,
				payload: 'Произошла ошибка при загрузке пользователей',
			})
		}
	}
}
