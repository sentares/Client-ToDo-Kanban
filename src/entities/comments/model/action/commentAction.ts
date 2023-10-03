import axios, { AxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'
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

export const createComment = (
	taskId: string,
	toRespCommId: string,
	token: string,
	title: string
) => {
	return async (dispatch: Dispatch<CommentsActions>) => {
		try {
			dispatch({ type: CommentActionsTypes.CREATE_COMMENT })

			const responseToComId = toRespCommId ? toRespCommId : null

			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `${token}`,
				},
			}

			const response = await axios.post(
				`${URL}/comment/to/${taskId}`,
				{ title, responseToComId },
				config
			)

			console.log(response.data)

			dispatch({
				type: CommentActionsTypes.CREATE_COMMENT_SUCCESS,
				payload: response.data,
			})
		} catch (e) {
			dispatch({
				type: CommentActionsTypes.CREATE_COMMENT_ERROR,
				payload: 'Произошла ошибка при создании комментария',
			})
			toast.error('Произошла ошибка при создании комментария')
		}
	}
}
