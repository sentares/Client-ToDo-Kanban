import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { ITask } from 'entities/tasks'
import { useState } from 'react'

const KanbanModule = (fetchedtasks: ITask[]) => {
	const [activeTask, setActiveTask] = useState<ITask | null>(null)
	const [tasks, setTasks] = useState<ITask[]>(fetchedtasks)

	function onDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === 'Task') {
			setActiveTask(event.active.data.current.fetchedTask)
			return
		}
	}

	function onDragEnd(event: DragEndEvent) {
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
					// console.log(overId)

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
	return { onDragStart, onDragEnd, onDragOver, activeTask, tasks }
}

export default KanbanModule
