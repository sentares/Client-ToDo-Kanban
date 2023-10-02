import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { IStatus } from 'entities/status'
import { ITask, TaskRequests } from 'entities/tasks'
import { TasksCart } from 'features/tasks-cart'
import cls from './Columns.module.scss'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import CreateTaskModal from 'shared/ui/modal/create-task/CreateTaskModal'
import { IPriority } from 'entities/priorities'

interface ColumnsProps {
	projectId?: string
	priorities: IPriority[]
	tasks: ITask[]
	stat: IStatus
}

const Columns = (props: ColumnsProps) => {
	const { tasks, stat, projectId, priorities } = props
	const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
	const { createTask } = TaskRequests()

	const handleCreateTask = (title: string, priorityId: string) => {
		if (projectId && title.length) {
			createTask(title, stat._id, projectId, priorityId)
		} else {
			console.log('ed')
		}
	}

	const ruleModal = () => {
		setIsOpenCreateModal(!isOpenCreateModal)
	}

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

	const tasksIds = useMemo(() => {
		return tasks.map(task => task._id)
	}, [tasks])

	return (
		<>
			{isOpenCreateModal && (
				<CreateTaskModal
					onCloseModal={ruleModal}
					handleCreateTask={handleCreateTask}
					priorities={priorities}
				/>
			)}
			<div className={cls.column}>
				<div className={cls.columnName}>
					<div className={cls.title}>{stat.title}</div>
				</div>
				<div className={cls.tasksBlock}>
					<SortableContext items={tasksIds}>
						{tasks.map(task => (
							<TasksCart key={task._id} task={task} />
						))}
					</SortableContext>
				</div>
				<div className={cls.footer}>
					<button className={cls.addTask} onClick={ruleModal}>
						Новая задача <Plus />
					</button>
				</div>
			</div>
		</>
	)
}

export default Columns
