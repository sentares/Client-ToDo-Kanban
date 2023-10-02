import {
	StatusActionsTypes,
	StatusState,
	StatusesActions,
} from '../types/status'

const initialState: StatusState = {
	statuses: [],
	loading: false,
	error: null,
}

export const StatusReducer = (
	state = initialState,
	action: StatusesActions
): StatusState => {
	switch (action.type) {
		case StatusActionsTypes.FETCH_STATUSES:
			return { ...state, loading: true }
		case StatusActionsTypes.FETCH_STATUSES_SUCCESS:
			return { ...state, loading: false, statuses: action.payload }
		case StatusActionsTypes.FETCH_STATUSES_ERROR:
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}
