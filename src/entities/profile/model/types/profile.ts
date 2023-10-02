import { IProfile } from '../../interface/IProfile'

export interface ProfileState {
	profile: IProfile
	loading: boolean
	error: null | string
}

export enum ProfileActionTypes {
	SIGNIN_PROFILE = 'SIGNIN_PROFILE',
	SIGNIN_PROFILE_SUCCESS = 'SIGNIN_PROFILE_SUCCESS',
	SIGNIN_PROFILE_ERROR = 'SIGNIN_PROFILE_ERROR',
}

interface SigninProfileAction {
	type: ProfileActionTypes.SIGNIN_PROFILE
}

interface SigninProfileSuccessAction {
	type: ProfileActionTypes.SIGNIN_PROFILE_SUCCESS
	payload: IProfile
}

interface SigninProfileErrorAction {
	type: ProfileActionTypes.SIGNIN_PROFILE_ERROR
	payload: string
}

export type ProfileAction =
	| SigninProfileAction
	| SigninProfileSuccessAction
	| SigninProfileErrorAction
