import { IComment } from 'entities/comments'
import { toDate } from 'shared/lib/toDate'
import cls from './CommentBlock.module.scss'

interface CommentBlockProps {
	comments: IComment[]
	handleClickToResponse: (comm: IComment) => void
}

const CommentBlock = (props: CommentBlockProps) => {
	const { comments, handleClickToResponse } = props

	const rootComments = comments.filter(comment => !comment.responseToComId)

	return (
		<div className={cls.commentBlock}>
			{rootComments.map(rootComment => (
				<div key={rootComment._id} className={cls.comment}>
					<div className={cls.author}>
						{rootComment.author.email}
						<span className={cls.date}>{toDate(rootComment.createdAt)}</span>
					</div>
					<div className={cls.textBlock}>
						<div className={cls.textComm}>{rootComment.title}</div>
						<button
							className={cls.resp}
							onClick={handleClickToResponse.bind(null, rootComment)}
						>
							ответить
						</button>
					</div>

					<div className={cls.subcomments}>
						{comments
							.filter(comment => comment.responseToComId === rootComment._id)
							.map(subcomment => (
								<div key={subcomment._id} className={cls.subcomment}>
									<div className={cls.subcommentAuthor}>
										{subcomment.author.email}
										<span className={cls.date}>
											{toDate(subcomment.createdAt)}
										</span>
									</div>
									<div className={cls.textComm}>{subcomment.title}</div>
								</div>
							))}
					</div>
				</div>
			))}
		</div>
	)
}

export default CommentBlock
