import { PriorityReducer } from 'entities/priorities'
import { ProjectReducer } from 'entities/projects'
import { StatusReducer } from 'entities/status'
import { TasksReducer } from 'entities/tasks'
import { UserReducer } from 'entities/user'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
	user: UserReducer,
	statuses: StatusReducer,
	tasks: TasksReducer,
	priorities: PriorityReducer,
	projects: ProjectReducer,
})

export type RootState = ReturnType<typeof rootReducer>
