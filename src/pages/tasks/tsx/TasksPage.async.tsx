import { lazy } from 'react'

export const TasksPageAsync = lazy(async () => await import('./TasksPage'))
