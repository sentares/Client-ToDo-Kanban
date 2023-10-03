import {
	CommentActionsTypes,
	CommentState,
	CommentsActions,
} from '../types/comment'

const initialState: CommentState = {
	comments: [],
	fetchLoading: false,
	error: null,
}
export const CommentReducer = (
	state = initialState,
	action: CommentsActions
): CommentState => {
	switch (action.type) {
		case CommentActionsTypes.FETCH_COMMENT:
			return { fetchLoading: true, error: null, comments: [] }
		case CommentActionsTypes.FETCH_COMMENT_SUCCESS:
			return { fetchLoading: false, error: null, comments: action.payload }
		case CommentActionsTypes.FETCH_COMMENT_ERROR:
			return { fetchLoading: false, error: action.payload, comments: [] }

		case CommentActionsTypes.CREATE_COMMENT:
			return { ...state, fetchLoading: true }
		case CommentActionsTypes.CREATE_COMMENT_SUCCESS:
			return {
				...state,
				fetchLoading: false,
				comments: [...state.comments, action.payload],
			}
		case CommentActionsTypes.CREATE_COMMENT_ERROR:
			return { ...state, fetchLoading: false, error: action.payload }
		default:
			return state
	}
}
