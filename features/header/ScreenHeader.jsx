import { TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

const ScreenHeader = () => {
	const navigation = useNavigation()
	return (
		<View
			style={{
				marginTop: 20,
				marginHorizontal: 20,
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<TouchableOpacity>
				<Icon
					name='chevron-left'
					type='font-awesome'
					color='#fff'
					size={24}
					iconStyle={{ width: 24 }}
					onPress={() => {
						navigation.goBack()
					}}
				/>
			</TouchableOpacity>
			<TouchableOpacity>
				<Icon
					name='home'
					type='font-awesome'
					color='#fff'
					size={26}
					iconStyle={{ width: 26 }}
					onPress={() => {
						navigation.navigate("Home")
					}}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default ScreenHeader
