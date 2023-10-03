import { IComment } from 'entities/comments'
import { ITask } from 'entities/tasks'
import { CommentBlock } from 'features/comment-block'
import { Copy, SendHorizonal, X } from 'lucide-react'
import { useState } from 'react'
import { toDate } from 'shared/lib/toDate'
import cls from './TaskEditModal.module.scss'
import { copyToClipboard } from 'shared/lib/copyText'
import { useActions, useTypedSelector } from 'app/providers/store'

interface ITaskEditModalProps {
	fetchedTask: ITask
	comments: IComment[]
	ruleModal: () => {}
	fetchCommentLoading: boolean
}

const TaskEditModal = (prop: ITaskEditModalProps) => {
	const { fetchedTask, comments, ruleModal, fetchCommentLoading } = prop
	const { createComment } = useActions()

	const { profile } = useTypedSelector(state => state.profile)

	const [newComm, setNewComm] = useState('')
	const [clickedComm, setClickedComm] = useState<IComment | null>(null)
	const [clickedId, setClickedId] = useState('')

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

	const handleClickToResponse = (toRespComm: IComment) => {
		setClickedComm(toRespComm)
		setClickedId(toRespComm._id)
	}

	const handlePostComm = () => {
		createComment(fetchedTask._id, clickedId, profile.token, newComm)
		setNewComm('')
	}

	return (
		<div className={cls.taskEditModal}>
			<div className={cls.content}>
				<button className={cls.close} onClick={ruleModal}>
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
								onClick={copyToClipboard.bind(null, fetchedTask._id)}
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
					<div className={cls.commentBlock}>
						<h2>Комментарии</h2>
						{fetchCommentLoading ? (
							<div>Loading...</div>
						) : (
							<CommentBlock
								comments={comments}
								handleClickToResponse={handleClickToResponse}
							/>
						)}
						<div className={cls.textComm}>
							{clickedComm && (
								<label className={cls.respToAuthor}>
									<X
										className={cls.closeIcon}
										size={12}
										onClick={() => setClickedComm(null)}
									/>
									ответ{' '}
									<strong style={{ color: 'white' }}>
										{clickedComm.author.email}
									</strong>
									:
								</label>
							)}
							<input
								type='text'
								placeholder='Напишите комментарии'
								className={cls.commInput}
								value={newComm}
								onChange={e => setNewComm(e.target.value)}
							/>
							<SendHorizonal
								style={newComm.length ? { color: 'green' } : {}}
								onClick={handlePostComm}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TaskEditModal
