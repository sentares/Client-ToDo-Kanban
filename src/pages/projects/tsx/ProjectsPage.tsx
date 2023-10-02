import { useActions, useTypedSelector } from 'app/providers/store'
import { useEffect } from 'react'
import cls from './ProjectsPage.module.scss'
import { useNavigate } from 'react-router-dom'

const ProjectsPage = () => {
	const { projects, loading, error } = useTypedSelector(state => state.projects)
	const { fetchProjects } = useActions()
	const navigate = useNavigate()

	const navigateToTasks = (id: string) => {
		navigate(`/project/${id}/tasks`)
	}

	useEffect(() => {
		fetchProjects()
	}, [])

	return (
		<div className={cls.projectsPage}>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<h1>Выберите проект:</h1>
					{projects &&
						projects.map(project => (
							<div
								key={project._id}
								className={cls.project}
								onClick={navigateToTasks.bind(null, project._id)}
							>
								{project.name}
							</div>
						))}
				</div>
			)}
		</div>
	)
}

export default ProjectsPage
