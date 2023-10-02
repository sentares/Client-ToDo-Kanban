import {
	DndContext,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useActions, useTypedSelector } from 'app/providers/store'
import { ITask } from 'entities/tasks'
import { Columns } from 'features/colums'
import { memo, useEffect, useMemo, useState } from 'react'
import cls from './KanbanBoard.module.scss'

interface KanbanBoardProps {
	tasks: ITask[]
	projectId?: string
}
const KanbanBoard = memo((props: KanbanBoardProps) => {
	const { tasks, projectId } = props
	const { fetchStatuses, fetchPriorities } = useActions()

	const { statuses } = useTypedSelector(state => state.statuses)
	const { priorities } = useTypedSelector(state => state.priorities)

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
		if (event.active.data.current?.type === 'Task') {
			setActiveTask(event.active.data.current.task)
			return
		}
	}

	return (
		<div className={cls.kanbanBoard}>
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				// onDragEnd={onDragEnd}
				// onDragOver={onDragOver}
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
			</DndContext>
		</div>
	)
})

export default KanbanBoard
