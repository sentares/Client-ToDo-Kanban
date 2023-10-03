import { IPriority } from 'entities/priorities'
import { IStatus } from 'entities/status'
import { IUser } from 'entities/users'

export interface ITask {
	images?: string[]
	priority: IPriority
	status: IStatus
	title: string
	description: string
	publishedAt: number
	__v: number
	_id: string
	users?: IUser
}
