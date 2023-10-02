import * as PriorityActions from 'entities/priorities/model/action/priorityAction'
import * as StatusAction from 'entities/status/model/action/statusAction'
import * as TasksAction from 'entities/tasks/model/action/taskAction'
import * as UserAction from 'entities/user/model/action/userAction'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const ActionCreators = {
	...UserAction,
	...StatusAction,
	...TasksAction,
	...PriorityActions,
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(ActionCreators, dispatch)
}
