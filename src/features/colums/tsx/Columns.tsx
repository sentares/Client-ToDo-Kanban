import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IPriority } from 'entities/priorities'
import { IStatus } from 'entities/status'
import { ITask, TaskRequests } from 'entities/tasks'
import { TasksCart } from 'features/tasks-cart'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import CreateTaskModal from 'shared/ui/modal/create-task/CreateTaskModal'
import cls from './Columns.module.scss'

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
	})

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	}

	const tasksIds = useMemo(() => {
		return tasks.map(task => task._id)
	}, [tasks])

	if (isDragging) {
		return (
			<div ref={setNodeRef} style={style} className={cls.draggingColumn}></div>
		)
	}
	return (
		<>
			{isOpenCreateModal && (
				<CreateTaskModal
					onCloseModal={ruleModal}
					handleCreateTask={handleCreateTask}
					priorities={priorities}
					stat={stat}
				/>
			)}
			<div className={cls.column} ref={setNodeRef} style={style}>
				<div className={cls.columnName} {...attributes} {...listeners}>
					<div className={cls.title}>{stat.title}</div>
				</div>
				<div className={cls.tasksBlock}>
					<SortableContext items={tasksIds}>
						{tasks.map(task => (
							<TasksCart key={task._id} fetchedTask={task} />
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
