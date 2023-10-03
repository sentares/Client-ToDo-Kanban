import axios from 'axios'
import { Dispatch } from 'redux'
import { URL } from 'shared/api/api'
import { CommentActionsTypes, CommentsActions } from '../types/comment'

export const fetchComments = (taskId: string) => {
	return async (dispatch: Dispatch<CommentsActions>) => {
		try {
			dispatch({ type: CommentActionsTypes.FETCH_COMMENT })
			const response = await axios.get(`${URL}/comment/byProject/${taskId}`)

			dispatch({
				type: CommentActionsTypes.FETCH_COMMENT_SUCCESS,
				payload: response.data,
			})
		} catch (e) {
			dispatch({
				type: CommentActionsTypes.FETCH_COMMENT_ERROR,
				payload: 'Произошла ошибка при загрузке комментариев',
			})
		}
	}
}
