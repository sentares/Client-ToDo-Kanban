import { TaskActionsType, TaskState, TasksActions } from '../types/task'

const initialState: TaskState = {
	tasks: [],
	loading: false,
	createLoading: false,
	error: null,
}

export const TasksReducer = (
	state = initialState,
	action: TasksActions
): TaskState => {
	switch (action.type) {
		case TaskActionsType.FETCH_TASKS:
			return { ...state, loading: true }
		case TaskActionsType.CREATE_TASKS:
			return { ...state, createLoading: true }
		case TaskActionsType.FETCH_TASKS_SUCCESS:
			return {
				...state,
				loading: false,
				createLoading: false,
				tasks: action.payload,
			}
		case TaskActionsType.FETCH_TASKS_ERROR:
			return {
				...state,
				loading: false,
				createLoading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
