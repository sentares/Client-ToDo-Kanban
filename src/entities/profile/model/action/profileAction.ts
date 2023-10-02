import axios from 'axios'
import { Dispatch } from 'react'
import { URL } from 'shared/api/api'
import { ProfileAction, ProfileActionTypes } from '../types/profile'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage'

export const signInProfile = (email: string) => {
	return async (dispatch: Dispatch<ProfileAction>) => {
		try {
			const response = await axios.post(`${URL}/auth`, {
				email,
				password: 'qwerty',
			})

			localStorage.setItem(
				USER_LOCALSTORAGE_KEY,
				JSON.stringify(response.data.profile)
			)

			dispatch({
				type: ProfileActionTypes.SIGNIN_PROFILE_SUCCESS,
				payload: response.data.profile,
			})
		} catch (e) {
			dispatch({
				type: ProfileActionTypes.SIGNIN_PROFILE_ERROR,
				payload: 'Произошла ошибка при входе в аккаунт',
			})
		}
	}
}
