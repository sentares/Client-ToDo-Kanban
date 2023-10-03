import { IComment } from '../../interface/IComment'

export interface CommentState {
	comments: IComment[]
	fetchLoading: boolean
	error: null | string
}

export enum CommentActionsTypes {
	FETCH_COMMENT = 'FETCH_COMMENT',
	FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS',
	FETCH_COMMENT_ERROR = 'FETCH_COMMENT_ERROR',
}

interface FetchCommentsAction {
	type: CommentActionsTypes.FETCH_COMMENT
}

interface FetchCommentsSuccessAction {
	type: CommentActionsTypes.FETCH_COMMENT_SUCCESS
	payload: IComment[]
}

interface FetchCommentsErrorAction {
	type: CommentActionsTypes.FETCH_COMMENT_ERROR
	payload: string
}

export type CommentsActions =
	| FetchCommentsAction
	| FetchCommentsSuccessAction
	| FetchCommentsErrorAction
