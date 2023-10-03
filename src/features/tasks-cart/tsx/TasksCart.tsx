import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useActions, useTypedSelector } from 'app/providers/store'
import { ITask } from 'entities/tasks'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import cls from './Tasks.module.scss'

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
			{mouseHover && (
				<div className={cls.header}>
					<button
						className={cls.trashButton}
						onClick={deleteTask.bind(null, fetchedTask._id, profile.token)}
					>
						<Trash2 width={16} />
					</button>
				</div>
			)}
			<div className={cls.content}>{fetchedTask.title}</div>
		</div>
	)
}

export default TasksCart
