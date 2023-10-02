import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage'
import {
	ProfileAction,
	ProfileActionTypes,
	ProfileState,
} from '../types/profile'

const savedProfileDataString = localStorage.getItem(USER_LOCALSTORAGE_KEY)
let savedProfileData: { email: string; id: string; token: string } | null = null

if (savedProfileDataString) {
	try {
		savedProfileData = JSON.parse(savedProfileDataString)
	} catch (error) {
		console.error('Ошибка при разборе данных из localStorage:', error)
	}
}

const initialState: ProfileState = {
	profile: savedProfileData || { email: '', id: '', token: '' },
	loading: false,
	error: null,
}

export const ProfileReducer = (
	state = initialState,
	action: ProfileAction
): ProfileState => {
	switch (action.type) {
		case ProfileActionTypes.SIGNIN_PROFILE:
			return {
				...state,
				loading: true,
				error: null,
				profile: initialState.profile,
			}
		case ProfileActionTypes.SIGNIN_PROFILE_SUCCESS:
			return { ...state, loading: false, error: null, profile: action.payload }
		case ProfileActionTypes.SIGNIN_PROFILE_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				profile: initialState.profile,
			}
		default:
			return state
	}
}
