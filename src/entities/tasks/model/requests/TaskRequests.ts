import axios, { AxiosRequestConfig } from 'axios'
import { URL } from 'shared/api/api'

export const TaskRequests = () => {
	const createTask = async (
		title: string,
		statusId: string,
		projectId: string,
		priorityId: string,
		token: string
	) => {
		const config: AxiosRequestConfig = {
			headers: {
				Authorization: `${token}`,
			},
		}

		try {
			await axios.post(
				`${URL}/task`,
				{
					title,
					statusId,
					priorityId,
					projectId,
				},
				config
			)
		} catch (e) {
			console.log(e)
		}
	}
	return { createTask }
}
