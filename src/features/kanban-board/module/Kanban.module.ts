import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useActions } from 'app/providers/store'
import { ITask } from 'entities/tasks'
import { useEffect, useMemo, useState } from 'react'

const KanbanModule = (fetchedTasks: ITask[], token: string) => {
	const [activeTask, setActiveTask] = useState<ITask | null>(null)
	const [tasks, setTasks] = useState<ITask[]>(fetchedTasks)
	const [overColumnId, setOverColumnId] = useState<string | null>(null)

	const { updateTask } = useActions()

	useEffect(() => {
		if (overColumnId && activeTask) {
			updateTask(activeTask._id.toString(), overColumnId, token)
		}
	}, [overColumnId, activeTask, token])

	useMemo(() => {
		setTasks(fetchedTasks)
	}, [fetchedTasks])

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

		setTasks(prevTasks => {
			const newTasks = [...prevTasks]
			const activeIndex = newTasks.findIndex(t => t._id === activeId)
			const overIndex = newTasks.findIndex(t => t._id === overId)

			if (isActiveATask) {
				const activeStatusId = newTasks[activeIndex].status._id
				const overStatusId = newTasks[overIndex]?.status._id

				if (isOverAColumn) {
					setOverColumnId(overId.toString())
					newTasks[activeIndex].status._id = overId.toString()
				} else if (activeStatusId !== overStatusId) {
					newTasks[activeIndex].status._id = overStatusId
					return arrayMove(newTasks, activeIndex, overIndex - 1)
				}

				return arrayMove(newTasks, activeIndex, overIndex)
			}

			return newTasks
		})
	}

	return { onDragStart, onDragEnd, onDragOver, activeTask, tasks }
}

export default KanbanModule
