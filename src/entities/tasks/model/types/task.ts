import { ITask } from '../../interface/Itask'

export interface TaskState {
	tasks: ITask[]
	loading: boolean
	error: null | string
}

export enum TaskActionsType {
	FETCH_TASKS = 'FETCH_TASKS',
	FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
	FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
}

interface FetchTasksAction {
	type: TaskActionsType.FETCH_TASKS
}

interface FetchTasksSuccessAction {
	type: TaskActionsType.FETCH_TASKS_SUCCESS
	payload: any[]
}

interface FetchTasksErrorAction {
	type: TaskActionsType.FETCH_TASKS_ERROR
	payload: string
}

export type TasksActions =
	| FetchTasksAction
	| FetchTasksSuccessAction
	| FetchTasksErrorAction
