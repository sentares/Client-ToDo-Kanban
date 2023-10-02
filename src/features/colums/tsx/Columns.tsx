import { useSortable } from '@dnd-kit/sortable'
import { IStatus } from 'entities/status'
import { ITask } from 'entities/tasks'
import { TasksCart } from 'features/tasks-cart'
import cls from './Columns.module.scss'
import { Plus } from 'lucide-react'

interface ColumnsProps {
	tasks: ITask[]
	stat: IStatus
}

const Columns = (props: ColumnsProps) => {
	const { tasks, stat } = props

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: stat._id,
		data: {
			type: 'Column',
			stat,
		},
		// disabled: editMode,
	})

	function createTask() {}

	return (
		<div className={cls.column}>
			<div className={cls.columnName}>
				<div className={cls.title}>{stat.title}</div>
			</div>
			<div>
				{tasks.map(task => (
					<TasksCart task={task} />
				))}
			</div>
			<div className={cls.footer}>
				<button className={cls.addTask} onClick={createTask.bind(null)}>
					Новая таска <Plus />
				</button>
			</div>
		</div>
	)
}

export default Columns
