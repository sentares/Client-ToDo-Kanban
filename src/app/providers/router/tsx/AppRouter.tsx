import { memo, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '../config/RouteConfig'

const AppRouter = () => {
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
