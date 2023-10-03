export const toDate = (timestamp: number) => {
	const date = new Date(timestamp)

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}

	const formatter = new Intl.DateTimeFormat('ru-RU', options)
	const formattedDate = formatter.format(date)

	return formattedDate
}
