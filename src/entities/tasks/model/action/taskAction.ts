import axios, { AxiosRequestConfig } from 'axios'
import { ITask } from 'entities/tasks/interface/Itask'
import { Dispatch } from 'redux'
import { URL } from 'shared/api/api'
import { TaskActionsType, TasksActions } from '../types/task'

export const fetchTasks = (projectId: string) => {
	return async (dispatch: Dispatch<TasksActions>) => {
		try {
			dispatch({ type: TaskActionsType.FETCH_TASKS })
			const response = await axios.get(`${URL}/task/byProject/${projectId}`)

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
	previousTasks: ITask[],
	title: string,
	statusId: string,
	projectId: string,
	priorityId: string,
	token: string
) => {
	return async (dispatch: Dispatch<TasksActions>) => {
		try {
			dispatch({ type: TaskActionsType.CREATE_TASKS })

			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `${token}`,
				},
			}

			const response = await axios.post(
				`${URL}/task`,
				{
					title,
					statusId,
					priorityId,
					projectId,
				},
				config
			)

			if (response.data) {
				dispatch({
					type: TaskActionsType.FETCH_TASKS_SUCCESS,
					payload: [response.data, ...previousTasks],
				})
			} else {
				dispatch({
					type: TaskActionsType.FETCH_TASKS_ERROR,
					payload: 'Пустой ответ от сервера',
				})
			}
		} catch (error) {
			dispatch({
				type: TaskActionsType.FETCH_TASKS_ERROR,
				payload: 'Произошла ошибка при загрузке задач',
			})
		}
	}
}

export const deleteTask = (taskId: string, token: string) => {
	return async (dispatch: Dispatch<TasksActions>) => {
		try {
			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `${token}`,
				},
			}
			// dispatch({ type: TaskActionsType.FETCH_TASKS })
			const response = await axios.delete(`${URL}/task/${taskId}`, config)

			// if (response.data) {
			// 	dispatch({
			// 		type: TaskActionsType.FETCH_TASKS_SUCCESS,
			// 		payload: [response.data, ...previousTasks],
			// 	})
			// } else {
			// 	dispatch({
			// 		type: TaskActionsType.FETCH_TASKS_ERROR,
			// 		payload: 'Пустой ответ от сервера',
			// 	})
			// }
		} catch (e) {
			dispatch({
				type: TaskActionsType.FETCH_TASKS_ERROR,
				payload: 'Произошла ошибка при загрузке задач',
			})
		}
	}
}
