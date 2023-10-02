import { useActions, useTypedSelector } from 'app/providers/store'
import { useEffect } from 'react'

const MainPage = () => {
	const { users } = useTypedSelector(state => state.user)
	const { statuses } = useTypedSelector(state => state.statuses)
	const { tasks } = useTypedSelector(state => state.tasks)
	const { priorities } = useTypedSelector(state => state.priorities)
	const { projects } = useTypedSelector(state => state.projects)

	const {
		fetchUsers,
		fetchStatuses,
		fetchTasks,
		fetchPriorities,
		fetchProjects,
	} = useActions()

	useEffect(() => {
		fetchUsers()
		fetchStatuses()
		fetchTasks()
		fetchPriorities()
		fetchProjects()
	}, [])

	console.log(users, 'users')
	console.log(statuses, 'statuses')
	console.log(tasks, 'tasks')
	console.log(priorities, 'priorities')
	console.log(projects, 'projects')

	return (
		<div style={{ display: 'flex', gap: '40px' }}>
			{statuses &&
				statuses.map(status => (
					<div key={status._id}>
						{status.title}
						{tasks && tasks.map(task => <div key={task._id}>{task.title}</div>)}
					</div>
				))}

			<div></div>
		</div>
	)
}

export default MainPage
