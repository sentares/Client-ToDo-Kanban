import { AppRouter } from './providers/router'
import { ToastProvier } from './providers/toast'

function App() {
	return (
		<>
			<ToastProvier />
			<AppRouter />
		</>
	)
}

export default App
