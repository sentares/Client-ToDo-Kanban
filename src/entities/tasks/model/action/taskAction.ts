import axios, { AxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'
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
	title: string,
	description: string,
	statusId: string,
	projectId: string,
	priorityId: string,
	token: string
) => {
	return async (dispatch: Dispatch<TasksActions>) => {
		try {
			console.log(description, 'createTask')

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
					description,
					statusId,
					priorityId,
					projectId,
				},
				config
			)

			dispatch({
				type: TaskActionsType.CREATE_TASKS_SUCCESS,
				payload: response.data,
			})
			toast.success('Задача создана')
		} catch (error) {
			console.log(error)

			dispatch({
				type: TaskActionsType.CREATE_TASKS_ERROR,
				payload: 'Произошла ошибка при создании задачи',
			})
			toast.error('Произошла ошибка при создании задачи')
		}
	}
}

export const updateTask = (taskId: string, statusId: string, token: string) => {
	return async (dispatch: Dispatch<TasksActions>) => {
		try {
			dispatch({ type: TaskActionsType.UPDATE_TASK })

			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `${token}`,
				},
			}
			const response = await axios.patch(
				`${URL}/task/${taskId}`,
				{ statusId: statusId },
				config
			)

			dispatch({
				type: TaskActionsType.UPDATE_TASK_SUCCESS,
				payload: response.data,
			})
		} catch (e) {
			console.log(e)
			dispatch({
				type: TaskActionsType.DELETE_TASK_ERROR,
				payload: 'Произошла ошибка при изменении задачи',
			})
			toast.success('Произошла ошибка при изменении задачи')
		}
	}
}

export const deleteTask = (taskId: string, token: string) => {
	return async (dispatch: Dispatch<TasksActions>) => {
		try {
			dispatch({ type: TaskActionsType.DELETE_TASK })
			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `${token}`,
				},
			}
			await axios.delete(`${URL}/task/${taskId}`, config)

			dispatch({
				type: TaskActionsType.DELETE_TASK_SUCCESS,
				payload: taskId,
			})
			toast.success('Задача удалена')
		} catch (e) {
			dispatch({
				type: TaskActionsType.DELETE_TASK_ERROR,
				payload: 'Произошла ошибка при удалении задачи',
			})
			toast.success('Произошла ошибка при удалении задачи')
		}
	}
}
