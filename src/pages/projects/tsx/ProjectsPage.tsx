import { useActions, useTypedSelector } from 'app/providers/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import cls from './ProjectsPage.module.scss'

const ProjectsPage = () => {
	const {
		projects,
		loading: projectsLoading,
		error: projectsError,
	} = useTypedSelector(state => state.projects)

	const {
		users,
		loading: usersLoading,
		error: usersError,
	} = useTypedSelector(state => state.users)

	const {
		profile,
		loading: profileLoading,
		error: profileError,
	} = useTypedSelector(state => state.profile)

	const { fetchProjects, fetchUsers, signInProfile } = useActions()
	const navigate = useNavigate()

	const navigateToTasks = (id: string) => {
		navigate(`/project/${id}/tasks`)
	}

	useEffect(() => {
		fetchProjects()
		fetchUsers()
	}, [])

	console.log(profile, 'profile')

	return (
		<div className={cls.projectsPage}>
			{projectsLoading || usersLoading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<div className={cls.chooseProfileModal}>
						<h1>
							{!profile.email ? 'Выберите профиль:' : 'Сменить пользователя'}
						</h1>
						{users.map(user => (
							<div
								key={user._id}
								onClick={signInProfile.bind(null, user.email)}
							>
								{user.email}
							</div>
						))}
					</div>
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
				</div>
			)}
		</div>
	)
}

export default ProjectsPage
