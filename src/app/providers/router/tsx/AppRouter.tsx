import { memo, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { routeConfig } from '../config/RouteConfig'

const AppRouter = () => {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/projects')
		}
	}, [location.pathname, navigate])

	return (
		<Routes>
			{Object.values(routeConfig).map(({ path, element }) => (
				<Route
					key={path}
					path={path}
					element={<Suspense fallback={'Loading...'}>{element}</Suspense>}
				/>
			))}
		</Routes>
	)
}

export default memo(AppRouter)
