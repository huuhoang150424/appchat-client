import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</BrowserRouter>
)
