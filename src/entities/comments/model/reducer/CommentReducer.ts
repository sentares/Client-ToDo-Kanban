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
		default:
			return state
	}
}
