import axios from 'axios'
import { Dispatch } from 'redux'
import { URL } from 'shared/api/api'
import { ProjectActionsTypes, ProjectsActions } from '../types/project'

export const fetchProjects = () => {
	return async (dispatch: Dispatch<ProjectsActions>) => {
		try {
			dispatch({ type: ProjectActionsTypes.FETCH_PROJECTS })
			const response = await axios.get(`${URL}/project`)

			dispatch({
				type: ProjectActionsTypes.FETCH_PROJECTS_SUCCESS,
				payload: response.data,
			})
		} catch (e) {
			dispatch({
				type: ProjectActionsTypes.FETCH_PROJECTS_ERROR,
				payload: 'Произошла ошибка при загрузке проектов',
			})
		}
	}
}
