import { Toaster } from 'react-hot-toast'

export const ToastProvier = () => {
	return (
		<Toaster
			toastOptions={{
				style: {
					maxWidth: '800px',
					padding: '16px',
					fontSize: '18px',
					fontWeight: 600,
					background: '#FFB61F',
				},
				error: {
					style: {
						background: '#AF0E0E',
						color: 'white',
					},
				},
				success: {
					style: {
						background: '#009455',
						color: 'white',
					},
				},
				loading: {
					style: {
						background: 'gray',
						color: 'white',
					},
				},
			}}
		/>
	)
}
