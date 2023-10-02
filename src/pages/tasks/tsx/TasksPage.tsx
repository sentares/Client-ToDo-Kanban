import { useParams } from 'react-router-dom'

const TasksPage = () => {
	const params = useParams()
	const { id } = params

	return <div>TasksPage</div>
}

export default TasksPage
