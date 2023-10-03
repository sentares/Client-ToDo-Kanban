import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useActions, useTypedSelector } from 'app/providers/store'
import { IPriority } from 'entities/priorities'
import { IStatus } from 'entities/status'
import { ITask } from 'entities/tasks'
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

	const { profile } = useTypedSelector(state => state.profile)

	const { createTask } = useActions()
	const { tasks: previousTasks } = useTypedSelector(state => state.tasks)

	const handleCreateTask = (title: string, priorityId: string) => {
		if (projectId && title.length) {
			createTask(
				previousTasks,
				title,
				stat._id,
				projectId,
				priorityId,
				profile.token
			)
		} else {
			console.log('ed')
		}
	}

	const ruleModal = () => {
		setIsOpenCreateModal(!isOpenCreateModal)
	}

	const { setNodeRef } = useSortable({
		id: stat._id,
		data: {
			type: 'Column',
			stat,
		},
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
					stat={stat}
				/>
			)}
			<div className={cls.column} ref={setNodeRef}>
				<div className={cls.columnName}>
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
