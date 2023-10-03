import { IStatus } from '../../interface/IStatus'

export interface StatusState {
	statuses: IStatus[]
	loading: boolean
	error: null | string
}

export enum StatusActionsTypes {
	FETCH_STATUSES = 'FETCH_STATUSES',
	FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS',
	FETCH_STATUSES_ERROR = 'FETCH_STATUSES_ERROR',
}

interface FetchStatusesAction {
	type: StatusActionsTypes.FETCH_STATUSES
}

interface FetchStatusesSuccessAction {
	type: StatusActionsTypes.FETCH_STATUSES_SUCCESS
	payload: IStatus[]
}

interface FetchStatusesErrorAction {
	type: StatusActionsTypes.FETCH_STATUSES_ERROR
	payload: string
}

export type StatusesActions =
	| FetchStatusesAction
	| FetchStatusesSuccessAction
	| FetchStatusesErrorAction
