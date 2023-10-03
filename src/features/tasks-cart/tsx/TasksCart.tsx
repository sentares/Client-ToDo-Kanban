import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useActions, useTypedSelector } from 'app/providers/store'
import { ITask } from 'entities/tasks'
import { Copy, Pen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import cls from './Tasks.module.scss'
import { toDate } from 'shared/lib/toDate'
import TaskEditModal from 'shared/ui/modal/task-edit/TaskEditModal'

interface TasksCartProps {
	fetchedTask: ITask
}

const TasksCart = (props: TasksCartProps) => {
	const { fetchedTask } = props
	const { deleteTask } = useActions()
	const { profile } = useTypedSelector(state => state.profile)
	const { updateLoading, deleteLoading } = useTypedSelector(
		state => state.tasks
	)

	const [mouseHover, setMouseHover] = useState(false)
	const [isOpenModal, setIsOpenModal] = useState(false)

	const ruleModal = () => {
		setIsOpenModal(!isOpenModal)
	}

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: fetchedTask._id,
		data: {
			type: 'Task',
			fetchedTask,
		},
		disabled: updateLoading || deleteLoading,
	})

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	}

	if (isDragging) {
		return <div ref={setNodeRef} style={style} className={cls.draggingCart} />
	}

	const getPriorityBg = (priority: string) => {
		switch (priority) {
			case 'Не срочно 🐢':
				return { backgroundColor: '#024275' }
			case 'Срочно ⏰':
				return { backgroundColor: '#af5c24' }
			case 'Очень срочно 🔥':
				return { backgroundColor: 'var(--agr-red)' }
			default:
				return { backgroundColor: 'white' }
		}
	}

	return (
		<div
			className={cls.taskCart}
			onMouseEnter={() => setMouseHover(true)}
			onMouseLeave={() => setMouseHover(false)}
			ref={setNodeRef}
			style={updateLoading || deleteLoading ? { opacity: 0.4 } : style}
			{...attributes}
			{...listeners}
		>
			{isOpenModal && fetchedTask && (
				<TaskEditModal fetchedTask={fetchedTask} />
			)}
			<div className={cls.contentBlock}>
				<div className={cls.date}>от: {toDate(fetchedTask.publishedAt)}</div>
				<div className={cls.content}>{fetchedTask.title}</div>
				<div className={cls.description}>{fetchedTask.description}</div>
				<div
					className={cls.priority}
					style={getPriorityBg(fetchedTask.priority.title)}
				>
					{fetchedTask.priority.title}
				</div>
			</div>
			<div className={cls.sideBlock}>
				{mouseHover && (
					<>
						<button className={cls.editButton} onClick={ruleModal}>
							<Pen width={16} />
						</button>
						<button
							className={cls.copyButton}
							// onClick={deleteTask.bind(null, fetchedTask._id, profile.token)}
						>
							<Copy width={16} />
						</button>
						<button
							className={cls.trashButton}
							onClick={deleteTask.bind(null, fetchedTask._id, profile.token)}
						>
							<Trash2 width={16} />
						</button>
					</>
				)}
			</div>
		</div>
	)
}

export default TasksCart
