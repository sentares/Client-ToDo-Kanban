import { TaskActionsType, TaskState, TasksActions } from '../types/task'

const initialState: TaskState = {
	tasks: [],
	fetchLoading: false,
	createLoading: false,
	deleteLoading: false,
	error: null,
}

export const TasksReducer = (
	state = initialState,
	action: TasksActions
): TaskState => {
	switch (action.type) {
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

		default:
			return state
	}
}
