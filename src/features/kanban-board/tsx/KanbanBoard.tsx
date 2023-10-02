import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useActions, useTypedSelector } from 'app/providers/store'
import { ITask } from 'entities/tasks'
import { Columns } from 'features/colums'
import { memo, useEffect, useMemo } from 'react'
import cls from './KanbanBoard.module.scss'

interface KanbanBoardProps {
	tasks: ITask[]
}
const KanbanBoard = memo((props: KanbanBoardProps) => {
	const { tasks } = props
	const { fetchStatuses } = useActions()

	const { statuses, loading } = useTypedSelector(state => state.statuses)

	useEffect(() => {
		fetchStatuses()
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
				// onDragStart={onDragStart}
				// onDragEnd={onDragEnd}
				// onDragOver={onDragOver}
			>
				{statuses && (
					<div className={cls.columsBlock}>
						<SortableContext items={columnsId}>
							{statuses.map(stat => (
								<Columns
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
