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

	CREATE_COMMENT = 'CREATE_COMMENT',
	CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS',
	CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR',
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

interface CreateCommentsAction {
	type: CommentActionsTypes.CREATE_COMMENT
}

interface CreateCommentsSuccessAction {
	type: CommentActionsTypes.CREATE_COMMENT_SUCCESS
	payload: IComment
}

interface CreateCommentsErrorAction {
	type: CommentActionsTypes.CREATE_COMMENT_ERROR
	payload: string
}

export type CommentsActions =
	| FetchCommentsAction
	| FetchCommentsSuccessAction
	| FetchCommentsErrorAction
	| CreateCommentsAction
	| CreateCommentsSuccessAction
	| CreateCommentsErrorAction
