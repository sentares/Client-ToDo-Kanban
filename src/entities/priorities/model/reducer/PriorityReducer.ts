import {
	PrioritiesActions,
	PriorityActionsTypes,
	PriorityState,
} from '../types/priority'

const initialState: PriorityState = {
	priorities: [],
	loading: false,
	error: null,
}
export const PriorityReducer = (
	state = initialState,
	action: PrioritiesActions
): PriorityState => {
	switch (action.type) {
		case PriorityActionsTypes.FETCH_PRIORITY:
			return { loading: true, error: null, priorities: [] }
		case PriorityActionsTypes.FETCH_PRIORITY_SUCCESS:
			return { loading: false, error: null, priorities: action.payload }
		case PriorityActionsTypes.FETCH_PRIORITY_ERROR:
			return { loading: false, error: action.payload, priorities: [] }
		default:
			return state
	}
}
