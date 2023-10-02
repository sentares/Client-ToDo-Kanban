import axios from 'axios'
import { Dispatch } from 'redux'
import { URL } from 'shared/api/api'
import { PrioritiesActions, PriorityActionsTypes } from '../types/priority'

export const fetchPriorities = () => {
	return async (dispatch: Dispatch<PrioritiesActions>) => {
		try {
			dispatch({ type: PriorityActionsTypes.FETCH_PRIORITY })
			const response = await axios.get(`${URL}/priority`)

			dispatch({
				type: PriorityActionsTypes.FETCH_PRIORITY_SUCCESS,
				payload: response.data,
			})
		} catch (e) {
			dispatch({
				type: PriorityActionsTypes.FETCH_PRIORITY_ERROR,
				payload: 'Произошла ошибка при загрузке пользователей',
			})
		}
	}
}
