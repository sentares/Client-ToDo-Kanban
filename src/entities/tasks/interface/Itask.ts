import { IPriority } from 'entities/priorities'
import { IStatus } from 'entities/status'
import { IUser } from 'entities/user'

export interface ITask {
	images?: string[]
	priority: IPriority
	status: IStatus
	title: string
	__v: number
	_id: string
	users?: IUser
}
