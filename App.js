import Main from './screens/MainComponent'
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'

import {
	Provider as PaperProvider,
	MD2DarkTheme,
	MD2LightTheme,
} from 'react-native-paper'
import { Provider } from 'react-redux'
import { store } from './redux/store'

export default function App() {
	const CombinedDefaultTheme = {
		...MD2LightTheme,
		...NavigationDefaultTheme,
		colors: {
			...MD2LightTheme.colors,
			...NavigationDefaultTheme.colors,
		},
	}
	const CombinedDarkTheme = {
		...MD2DarkTheme,
		...NavigationDarkTheme,
		colors: {
			...MD2DarkTheme.colors,
			...NavigationDarkTheme.colors,
		},
	}

	return (
		<Provider store={store}>
			<PaperProvider theme={CombinedDarkTheme}>
				<NavigationContainer theme={CombinedDarkTheme}>
					<Main />
				</NavigationContainer>
			</PaperProvider>
		</Provider>
	)
}
