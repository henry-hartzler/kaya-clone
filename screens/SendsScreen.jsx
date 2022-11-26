import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Alert,
} from "react-native"
import { ListItem, Avatar, Icon } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { toggleToDo } from "../features/ToDo/toDoSlice"
import { toggleSends } from "../features/sends/sendsSlice"
import { SwipeRow } from "react-native-swipe-list-view"

const SendsScreen = ({ navigation }) => {
	const { climbsArray } = useSelector((state) => state.climbs)
	const toDos = useSelector((state) => state.toDos)
	const sends = useSelector((state) => state.sends)
	const dispatch = useDispatch()

	const sendClimbs = climbsArray.filter((climbs) => sends.includes(climbs.id))

	const renderClimbItem = ({ item: climb }) => {
		return (
			<SwipeRow rightOpenValue={-100}>
				<View style={styles.deleteView}>
					<TouchableOpacity
						style={styles.deleteTouchable}
						onPress={() =>
							Alert.alert(
								"Delete Send?",
								`Remove ${climb.name} from Sends List?`,
								[
									{
										text: "Cancel",
										style: "cancel",
									},
									{
										text: "OK",
										onPress: () => dispatch(toggleSends(climb.id)),
									},
								],
								{ cancelable: false }
							)
						}
					>
						<Icon
							name='trash'
							type='font-awesome'
							size={25}
							iconStyle={styles.deleteText}
							color='#fff'
						/>
					</TouchableOpacity>
				</View>
				<View>
					<ListItem
						key={climb.id}
						onPress={() => {
							navigation.navigate("ClimbInfo", { climb })
						}}
					>
						<Avatar
							rounded
							source={climb.image}
						/>
						<ListItem.Content style={styles.listItemContent}>
							<ListItem.Title>
								{climb.name}, {climb.grade}
							</ListItem.Title>
							<ListItem.Subtitle>{climb.location}</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				</View>
			</SwipeRow>
		)
	}
	return (
		<View style={styles.screen}>
			<View>
				<Text style={styles.headerTitle}>Sends List</Text>
			</View>
			<FlatList
				data={sendClimbs}
				renderItem={renderClimbItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	deleteView: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		flex: 1,
	},
	deleteTouchable: {
		backgroundColor: "red",
		height: "100%",
		width: 100,
		justifyContent: "center",
	},
	deleteText: {
		color: "white",
		fontWeight: "700",
		textAlign: "center",
		width: 100,
	},
	screen: {
		backgroundColor: "#000",
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	headerTitle: {
		color: "#FFFF00",
		paddingVertical: 20,
		fontSize: 32,
		fontWeight: "bold",
	},
})
export default SendsScreen
