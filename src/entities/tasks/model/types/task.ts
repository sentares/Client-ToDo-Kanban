import { ITask } from '../../interface/Itask'

export interface TaskState {
	tasks: ITask[]
	fetchLoading: boolean
	createLoading: boolean
	deleteLoading: boolean
	error: null | string
}

export enum TaskActionsType {
	FETCH_TASKS = 'FETCH_TASKS',
	FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
	FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
	CREATE_TASKS = 'CREATE_TASKS',
	CREATE_TASKS_SUCCESS = 'CREATE_TASKS_SUCCESS',
	CREATE_TASKS_ERROR = 'CREATE_TASKS_ERROR',
	DELETE_TASK = 'DELETE_TASK',
	DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS',
	DELETE_TASK_ERROR = 'DELETE_TASK_ERROR',
}

//FETCH
interface FetchTasksAction {
	type: TaskActionsType.FETCH_TASKS
}
interface FetchTasksSuccessAction {
	type: TaskActionsType.FETCH_TASKS_SUCCESS
	payload: ITask[]
}
interface FetchTasksErrorAction {
	type: TaskActionsType.FETCH_TASKS_ERROR
	payload: string
}

//CREATE
interface CreateTasksAction {
	type: TaskActionsType.CREATE_TASKS
}
interface CeateTasksSuccessAction {
	type: TaskActionsType.CREATE_TASKS_SUCCESS
	payload: ITask
}
interface CreateTasksErrorAction {
	type: TaskActionsType.CREATE_TASKS_ERROR
	payload: string
}

//DELETE
interface DeleteTaskAction {
	type: TaskActionsType.DELETE_TASK
}
interface DeleteTaskSuccessAction {
	type: TaskActionsType.DELETE_TASK_SUCCESS
	payload: string
}
interface DeleteTaskErrorAction {
	type: TaskActionsType.DELETE_TASK_ERROR
	payload: string
}

export type TasksActions =
	| FetchTasksAction
	| FetchTasksSuccessAction
	| FetchTasksErrorAction
	| CreateTasksAction
	| CeateTasksSuccessAction
	| CreateTasksErrorAction
	| DeleteTaskAction
	| DeleteTaskSuccessAction
	| DeleteTaskErrorAction
