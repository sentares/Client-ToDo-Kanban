export const TaskRequests = () => {
	const createTask = (
		tittle: string,
		statusId: string,
		projectId: string,
		priorityId: string
	) => {
		console.log(tittle, statusId, projectId, priorityId, 'from request')
	}
	return { createTask }
}
