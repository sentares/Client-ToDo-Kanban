import { IPriority } from 'entities/priorities'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import cls from './CreateTaskModal.module.scss'
import { IStatus } from 'entities/status'

interface CreateTaskModalProps {
	onCloseModal: () => void
	handleCreateTask: (arg0: string, arg1: string) => void
	priorities: IPriority[]
	stat: IStatus
}

const CreateTaskModal = (props: CreateTaskModalProps) => {
	const { onCloseModal, handleCreateTask, priorities, stat } = props
	const [title, setTitle] = useState('')
	const [activePriority, setActivePriority] = useState<string>(
		priorities[0]._id
	)

	return (
		<div className={cls.createTaskModal}>
			<div className={cls.content}>
				<button className={cls.close} onClick={onCloseModal}>
					<X />
				</button>
				<div className={cls.optionBlock}>
					<h1 style={{ marginBottom: '0px', color: 'white' }}>Новая задача</h1>
					<p>{stat.title}</p>
					<input
						type='text'
						placeholder='Введите описание задачи'
						className={cls.inputTitle}
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<div className={cls.priorityBlock}>
						<p>Выберите срочность</p>
						<div className={cls.priorityList}>
							{priorities.map(priority => (
								<div
									key={priority._id}
									className={cls.onePriority}
									style={
										activePriority === priority._id
											? { border: '1px solid red' }
											: {}
									}
									onClick={() => setActivePriority(priority._id)}
								>
									{priority.title}
								</div>
							))}
						</div>
					</div>
					<button
						className={cls.addTask}
						onClick={handleCreateTask.bind(null, title, activePriority)}
					>
						Создать <Plus />
					</button>
				</div>
			</div>
		</div>
	)
}

export default CreateTaskModal
