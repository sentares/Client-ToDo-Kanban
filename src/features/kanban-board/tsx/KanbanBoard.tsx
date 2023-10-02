import {
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useActions, useTypedSelector } from 'app/providers/store'
import { ITask } from 'entities/tasks'
import { Columns } from 'features/colums'
import { TasksCart } from 'features/tasks-cart'
import { memo, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import KanbanModule from '../module/Kanban.module'
import cls from './KanbanBoard.module.scss'

interface KanbanBoardProps {
	fetchedTasks: ITask[]
	projectId?: string
}
const KanbanBoard = memo((props: KanbanBoardProps) => {
	const { fetchedTasks, projectId } = props
	const { fetchStatuses, fetchPriorities } = useActions()

	const { statuses } = useTypedSelector(state => state.statuses)
	const { priorities } = useTypedSelector(state => state.priorities)

	const { onDragStart, onDragEnd, onDragOver, activeTask, tasks } =
		KanbanModule(fetchedTasks)

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
						{activeTask && <TasksCart fetchedTask={activeTask} />}
					</DragOverlay>,
					document.body
				)}
			</DndContext>
		</div>
	)
})

export default KanbanBoard
