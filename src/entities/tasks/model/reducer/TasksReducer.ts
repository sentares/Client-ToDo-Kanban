import { TaskActionsType, TaskState, TasksActions } from '../types/task'

const initialState: TaskState = {
	tasks: [],
	fetchLoading: false,
	createLoading: false,
	deleteLoading: false,
	updateLoading: false,
	error: null,
}

export const TasksReducer = (
	state = initialState,
	action: TasksActions
): TaskState => {
	switch (action.type) {
		//FETCH
		case TaskActionsType.FETCH_TASKS:
			return { ...state, fetchLoading: true }
		case TaskActionsType.FETCH_TASKS_SUCCESS:
			return {
				...state,
				fetchLoading: false,
				tasks: action.payload,
			}
		case TaskActionsType.FETCH_TASKS_ERROR:
			return {
				...state,
				fetchLoading: false,
				error: action.payload,
			}

		//CREATE
		case TaskActionsType.CREATE_TASKS:
			return { ...state, createLoading: true }
		case TaskActionsType.CREATE_TASKS_SUCCESS:
			return {
				...state,
				createLoading: false,
				tasks: [...state.tasks, action.payload],
			}
		case TaskActionsType.CREATE_TASKS_ERROR:
			return {
				...state,
				createLoading: false,
				error: action.payload,
			}

		//DELETE
		case TaskActionsType.DELETE_TASK:
			return { ...state, deleteLoading: true }
		case TaskActionsType.DELETE_TASK_SUCCESS:
			return {
				...state,
				deleteLoading: false,
				tasks: state.tasks.filter(task => task._id !== action.payload),
			}
		case TaskActionsType.DELETE_TASK_ERROR:
			return {
				...state,
				deleteLoading: false,
				error: action.payload,
			}

		//UPDATE
		case TaskActionsType.UPDATE_TASK:
			return { ...state, updateLoading: true }
		case TaskActionsType.UPDATE_TASK_SUCCESS:
			return {
				...state,
				updateLoading: false,
				// tasks: state.tasks.map(task =>
				// 	task._id === action.payload._id ? action.payload : task
				// ),
			}
		case TaskActionsType.UPDATE_TASK_ERROR:
			return {
				...state,
				updateLoading: false,
				error: action.payload,
			}

		default:
			return state
	}
}
