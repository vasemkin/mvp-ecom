import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './app/app'

import { Provider } from 'react-redux'
import { store } from './store/store'
import { DefaultTheme, ThemeProvider } from 'styled-components'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const theme: DefaultTheme = {
	colors: {
		'black.shadow': 'rgba(0, 0, 0, 0.04)',
		'black.main': 'rgba(0, 0, 0, 0.96)',
		white: '#FFF',
		'secondary.50': '#E7EEF9',
		'secondary.200': '#A8B8CA',
		'secondary.300': '#889BB1',
		'primary.100': '#B9DBFF',
		'primary.600': '#037BFF',
		'accent.approving': '#20B02E',
		'bg.approved': '#E6F5E6',
		'accent.notify': '#FF9900',
		'surface.low': '#DDDDDD',
	},
	padding: {
		section: '22px 24px',
	},
	shadows: {
		base: '0px 16px 24px 0px rgba(0, 0, 0, 0.04)',
	},
}

root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<StrictMode>
				<App />
			</StrictMode>
		</ThemeProvider>
	</Provider>
)
