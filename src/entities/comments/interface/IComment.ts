import { IUser } from 'entities/users'

export interface IComment {
	_id: string
	title: string
	author: IUser
	taskId: string
	createdAt: number
	responseToComId?: string
	__v: number
}
