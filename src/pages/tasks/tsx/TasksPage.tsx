import { useActions, useTypedSelector } from 'app/providers/store'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cls from './TasksPage.module.scss'
import { ArrowLeft } from 'lucide-react'
import { KanbanBoard } from 'features/kanban-board'

const TasksPage = () => {
	const params = useParams()
	const navigate = useNavigate()

	const { id } = params
	const projectId = id

	const { fetchTasks } = useActions()
	const { tasks, fetchLoading, error } = useTypedSelector(state => state.tasks)

	function navigateToProjects() {
		navigate('/projects')
	}

	useEffect(() => {
		if (projectId) {
			fetchTasks(projectId)
		}
	}, [projectId])

	return (
		<div className={cls.tasksPage}>
			<button className={cls.backBlock} onClick={navigateToProjects}>
				<ArrowLeft className={cls.Icon} />
			</button>
			{fetchLoading && <h1>Loading...</h1>}
			{error && <h1>Что то не так</h1>}
			{tasks && !fetchLoading && projectId && (
				<KanbanBoard fetchedTasks={tasks} projectId={projectId} />
			)}
		</div>
	)
}

export default TasksPage
