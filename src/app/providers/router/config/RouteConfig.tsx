import { MainPage } from 'pages/main'
import { type RouteProps } from 'react-router-dom'

export enum AppRoutes {
	MAIN = 'main',

	// last
	// NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',

	// last
	// [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
}
