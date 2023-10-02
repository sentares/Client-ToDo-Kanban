import { MainPage } from 'pages/main'
import { ProjectsPage } from 'pages/projects'
import { TasksPage } from 'pages/tasks'
import { type RouteProps } from 'react-router-dom'

export enum AppRoutes {
	MAIN = 'main',
	PROJECTS = 'projects',
	TASKS = 'tasks',

	// last
	// NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.PROJECTS]: '/projects',
	[AppRoutes.TASKS]: '/project/:id/tasks/',

	// last
	// [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.PROJECTS]: {
		path: RoutePath.projects,
		element: <ProjectsPage />,
	},
	[AppRoutes.TASKS]: {
		path: RoutePath.tasks,
		element: <TasksPage />,
	},
}
