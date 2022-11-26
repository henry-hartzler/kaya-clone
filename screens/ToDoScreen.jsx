import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Alert,
} from "react-native"
import { ListItem, Avatar } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { toggleToDo } from "../features/ToDo/toDoSlice"
import { SwipeRow } from "react-native-swipe-list-view"

const ToDoScreen = ({ navigation }) => {
	const { climbsArray } = useSelector((state) => state.climbs)
	const toDos = useSelector((state) => state.toDos)
	const dispatch = useDispatch()

	const toDoClimbs = climbsArray.filter((climbs) => toDos.includes(climbs.id))

	const renderClimbItem = ({ item: climb }) => {
		return (
			<SwipeRow rightOpenValue={-100}>
				<View style={styles.deleteView}>
					<TouchableOpacity
						style={styles.deleteTouchable}
						onPress={() =>
							Alert.alert(
								"Delete To Do?",
								`Remove ${climb.name} from To Do List?`,
								[
									{
										text: "Cancel",
										style: "cancel",
									},
									{
										text: "OK",
										onPress: () => dispatch(toggleToDo(climb.id)),
									},
								],
								{ cancelable: false }
							)
						}
					>
						<Text style={styles.deleteText}>Delete</Text>
					</TouchableOpacity>
				</View>
				<View>
					<ListItem
						style={styles.listItem}
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
			<View style={styles.header}>
				<Text style={styles.headerTitle}>To Do List</Text>
			</View>
			<FlatList
				data={toDoClimbs}
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
		justifyContent: "center",
	},
	deleteText: {
		color: "white",
		fontWeight: "700",
		textAlign: "center",
		fontSize: 16,
		width: 100,
	},
	screen: {
		backgroundColor: "#000",
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	listItem: {
		bottomBorderColor: "#000",
	},
	headerSubtitle: {
		color: "#fff",
		paddingBottom: 5,
		fontSize: 22,
	},
	headerTitle: {
		color: "#FFFF00",
		paddingRight: 50,
		fontSize: 32,
		fontWeight: "bold",
	},
})
export default ToDoScreen
