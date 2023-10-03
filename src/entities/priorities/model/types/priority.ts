import { IPriority } from '../../interface/IPriority'

export interface PriorityState {
	priorities: IPriority[]
	loading: boolean
	error: null | string
}

export enum PriorityActionsTypes {
	FETCH_PRIORITY = 'FETCH_PRIORITY',
	FETCH_PRIORITY_SUCCESS = 'FETCH_PRIORITY_SUCCESS',
	FETCH_PRIORITY_ERROR = 'FETCH_PRIORITY_ERROR',
}

interface FetchPrioritiesAction {
	type: PriorityActionsTypes.FETCH_PRIORITY
}

interface FetchPrioritiesSuccessAction {
	type: PriorityActionsTypes.FETCH_PRIORITY_SUCCESS
	payload: IPriority[]
}

interface FetchPrioritiesErrorAction {
	type: PriorityActionsTypes.FETCH_PRIORITY_ERROR
	payload: string
}

export type PrioritiesActions =
	| FetchPrioritiesAction
	| FetchPrioritiesSuccessAction
	| FetchPrioritiesErrorAction
