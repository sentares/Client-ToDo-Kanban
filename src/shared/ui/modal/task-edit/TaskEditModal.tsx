import { Copy, X } from 'lucide-react'
import cls from './TaskEditModal.module.scss'
import { ITask } from 'entities/tasks'
import { toDate } from 'shared/lib/toDate'
import { useState } from 'react'

interface ITaskEditModalProps {
	fetchedTask: ITask
}

const TaskEditModal = (prop: ITaskEditModalProps) => {
	const { fetchedTask } = prop

	const [areaDescription, setAreaRedscription] = useState(
		fetchedTask.description
	)

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
		<div className={cls.taskEditModal}>
			<div className={cls.content}>
				<button className={cls.close}>
					<X />
				</button>
				<div className={cls.optionBlock}>
					<div className={cls.infoBlock}>
						<div className={cls.nameBlock}>
							<h1>{fetchedTask.title}</h1>
							<div
								className={cls.priority}
								style={getPriorityBg(fetchedTask.priority.title)}
							>
								{fetchedTask.priority.title}
							</div>
						</div>
						<div className={cls.idBlock}>
							ID: {fetchedTask._id}
							<button
								className={cls.copyButton}
								// onClick={deleteTask.bind(null, fetchedTask._id, profile.token)}
							>
								<Copy width={16} />
							</button>
						</div>
						<div className={cls.date}>
							от: {toDate(fetchedTask.publishedAt)}
						</div>
						<div>
							<div>Участники:</div>
						</div>
						<div className={cls.textBlock}>
							<textarea
								className={cls.description}
								value={areaDescription}
								onChange={e => setAreaRedscription(e.target.value)}
							/>
						</div>
					</div>
					<div className={cls.commentBlock}></div>
				</div>
			</div>
		</div>
	)
}

export default TaskEditModal
