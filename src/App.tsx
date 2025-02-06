import {RouterProvider} from 'react-router-dom'
import router from '@/router/router'
import AppProvider from './providers/AppProvider'
import {TerminalContextProvider} from 'react-terminal'

function App() {
	return (
		<TerminalContextProvider>
			<AppProvider>
				<RouterProvider router={router} />
			</AppProvider>
		</TerminalContextProvider>
	)
}

export default App
