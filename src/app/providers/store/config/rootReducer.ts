import { PriorityReducer } from 'entities/priorities'
import { ProfileReducer } from 'entities/profile'
import { ProjectReducer } from 'entities/projects'
import { StatusReducer } from 'entities/status'
import { TasksReducer } from 'entities/tasks'
import { UserReducer } from 'entities/users'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
	users: UserReducer,
	statuses: StatusReducer,
	tasks: TasksReducer,
	priorities: PriorityReducer,
	projects: ProjectReducer,
	profile: ProfileReducer,
})

export type RootState = ReturnType<typeof rootReducer>
