import { lazy } from 'react'

export const ProjectsPageAsync = lazy(
	async () => await import('./ProjectsPage')
)
