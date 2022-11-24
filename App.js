import Main from "./screens/MainComponent"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"
import { store } from "./redux/store"

export default function App() {
	const MyTheme = {
		dark: true,
		colors: {
			primary: "#FFFF00",
			background: "#000",
			card: "#424449",
			text: "#fff",
			border: "#424449",
			notification: "#fff",
		},
	}
	return (
		<Provider store={store}>
			<NavigationContainer theme={MyTheme}>
				<Main />
			</NavigationContainer>
		</Provider>
	)
}
