import { IProject } from '../../interface/IProject'

export interface ProjectState {
	projects: IProject[]
	loading: boolean
	error: null | string
}

export enum ProjectActionsTypes {
	FETCH_PROJECTS = 'FETCH_PROJECTS',
	FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS',
	FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR',
}

interface FetchProjectsAction {
	type: ProjectActionsTypes.FETCH_PROJECTS
}

interface FetchProjectsSuccessAction {
	type: ProjectActionsTypes.FETCH_PROJECTS_SUCCESS
	payload: any[]
}

interface FetchProjectsErrorAction {
	type: ProjectActionsTypes.FETCH_PROJECTS_ERROR
	payload: string
}

export type ProjectsActions =
	| FetchProjectsAction
	| FetchProjectsSuccessAction
	| FetchProjectsErrorAction
