import Main from './screens/MainComponent'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { store } from './redux/store'

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer theme={DarkTheme}>
				<Main />
			</NavigationContainer>
		</Provider>
	)
}
