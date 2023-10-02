import {
	ProjectActionsTypes,
	ProjectState,
	ProjectsActions,
} from '../types/project'

const initialState: ProjectState = {
	projects: [],
	loading: false,
	error: null,
}

export const ProjectReducer = (
	state = initialState,
	action: ProjectsActions
): ProjectState => {
	switch (action.type) {
		case ProjectActionsTypes.FETCH_PROJECTS:
			return { ...state, loading: true }
		case ProjectActionsTypes.FETCH_PROJECTS_SUCCESS:
			return { ...state, loading: false, projects: action.payload }
		case ProjectActionsTypes.FETCH_PROJECTS_ERROR:
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}
