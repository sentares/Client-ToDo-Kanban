import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useActions, useTypedSelector } from 'app/providers/store'
import { ITask } from 'entities/tasks'
import { Columns } from 'features/colums'
import { TasksCart } from 'features/tasks-cart'
import { memo, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import cls from './KanbanBoard.module.scss'
import { IStatus } from 'entities/status'

interface KanbanBoardProps {
	fetchedTasks: ITask[]
	projectId?: string
}
const KanbanBoard = memo((props: KanbanBoardProps) => {
	const { fetchedTasks, projectId } = props
	const { fetchStatuses, fetchPriorities } = useActions()

	const { statuses } = useTypedSelector(state => state.statuses)
	const { priorities } = useTypedSelector(state => state.priorities)

	const [tasks, setTasks] = useState<ITask[]>(fetchedTasks)
	const [activeColumn, setActiveColumn] = useState<IStatus | null>(null)
	const [activeTask, setActiveTask] = useState<ITask | null>(null)

	useEffect(() => {
		fetchStatuses()
		fetchPriorities()
	}, [])

	const columnsId = useMemo(() => statuses.map(col => col._id), [statuses])

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	)

	function onDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === 'Column') {
			setActiveColumn(event.active.data.current.stat)
			return
		}

		if (event.active.data.current?.type === 'Task') {
			setActiveTask(event.active.data.current.fetchedTask)
			return
		}
	}

	function onDragEnd(event: DragEndEvent) {
		setActiveColumn(null)
		setActiveTask(null)
		const { active, over } = event
		if (!over) return

		const activeId = active.id
		const overId = over.id

		if (activeId === overId) return
	}

	function onDragOver(event: DragOverEvent) {
		const { active, over } = event
		if (!over) return

		const activeId = active.id
		const overId = over.id

		if (activeId === overId) return

		const isActiveATask = active.data.current?.type === 'Task'
		const isOverAColumn = over.data.current?.type === 'Column'

		setTasks(tasks => {
			const activeIndex = tasks.findIndex(t => t._id === activeId)
			const overIndex = tasks.findIndex(t => t._id === overId)

			if (isActiveATask) {
				const activeStatusId = tasks[activeIndex].status._id
				const overStatusId = tasks[overIndex]?.status._id

				if (isOverAColumn) {
					tasks[activeIndex].status._id = overId.toString()
				} else if (activeStatusId !== overStatusId) {
					tasks[activeIndex].status._id = overStatusId
					return arrayMove(tasks, activeIndex, overIndex - 1)
				}

				return arrayMove(tasks, activeIndex, overIndex)
			}

			return tasks
		})
	}

	return (
		<div className={cls.kanbanBoard}>
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
			>
				{statuses && (
					<div className={cls.columsBlock}>
						<SortableContext items={columnsId}>
							{statuses.map(stat => (
								<Columns
									projectId={projectId}
									priorities={priorities}
									key={stat._id}
									stat={stat}
									tasks={tasks.filter(task => task.status._id === stat._id)}
								/>
							))}
						</SortableContext>
					</div>
				)}
				{createPortal(
					<DragOverlay>
						{activeColumn && (
							<Columns
								stat={activeColumn}
								projectId={projectId}
								priorities={priorities}
								tasks={tasks.filter(
									task => task.status._id === activeColumn._id
								)}
							/>
						)}
						{activeTask && <TasksCart fetchedTask={activeTask} />}
					</DragOverlay>,
					document.body
				)}
			</DndContext>
		</div>
	)
})

export default KanbanBoard
