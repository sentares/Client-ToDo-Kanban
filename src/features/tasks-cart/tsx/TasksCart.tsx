import { ITask } from 'entities/tasks'
import cls from './Tasks.module.scss'

interface TasksCartProps {
	task: ITask
}

const TasksCart = (props: TasksCartProps) => {
	const { task } = props
	return <div>{task.title}</div>
}

export default TasksCart
