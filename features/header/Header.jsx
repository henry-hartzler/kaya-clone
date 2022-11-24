import { View, Text } from "react-native"
import { Icon } from "react-native-elements"

const Header = () => {
	return (
		<View>
			<Icon
				name='chevron left'
				type='font-awesome'
				color='#f50'
				raised
				reverse
				onPress={() => console.log("pressed")}
			/>
		</View>
	)
}

export default Header
