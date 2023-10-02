import axios from 'axios'
import { Dispatch } from 'redux'
import { URL } from 'shared/api/api'
import { TaskActionsType, TasksActions } from '../types/task'

export const fetchTasks = (id: string) => {
	return async (dispatch: Dispatch<TasksActions>) => {
		try {
			dispatch({ type: TaskActionsType.FETCH_TASKS })
			const response = await axios.get(`${URL}/task/byProject/${id}`)

			dispatch({
				type: TaskActionsType.FETCH_TASKS_SUCCESS,
				payload: response.data,
			})
		} catch (e) {
			dispatch({
				type: TaskActionsType.FETCH_TASKS_ERROR,
				payload: 'Произошла ошибка при загрузке задач',
			})
		}
	}
}

export const createTask = (
	idStatus: string,
	idProject: string,
	idPriority: string
) => {
	return async (dispatch: Dispatch<TasksActions>) => {
		try {
			dispatch({ type: TaskActionsType.FETCH_TASKS })
			const response = await axios.post(`${URL}/task`)
		} catch (e) {
			dispatch({
				type: TaskActionsType.FETCH_TASKS_ERROR,
				payload: 'Произошла ошибка при создании задачи',
			})
		}
	}
}
