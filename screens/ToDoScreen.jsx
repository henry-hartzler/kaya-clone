import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Alert,
	SafeAreaView,
} from 'react-native'
import { ListItem, Avatar, Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { toggleToDo } from '../features/ToDo/toDoSlice'
import { toggleSends } from '../features/sends/sendsSlice'
import { SwipeRow } from 'react-native-swipe-list-view'

const ToDoScreen = ({ navigation }) => {
	const { climbsArray } = useSelector((state) => state.climbs)
	const toDos = useSelector((state) => state.toDos)
	const dispatch = useDispatch()
	const toDoClimbs = climbsArray.filter((climbs) => toDos.includes(climbs.id))

	const renderClimbItem = ({ item: climb }) => {
		const inToDoClimbs = toDos.includes(climb.id)
		const toggleSend = () => {
			if (inToDoClimbs) {
				dispatch(toggleToDo(climb.id))
				dispatch(toggleSends(climb.id))
			} else {
				dispatch(toggleSends(climb.id))
			}
		}
		return (
			<SwipeRow
				rightOpenValue={-100}
				leftOpenValue={100}
			>
				<View style={styles.swipeView}>
					<TouchableOpacity
						style={styles.addTouchable}
						onPress={() =>
							Alert.alert(
								`Congrats on your send! 👊`,
								`Did you send ${climb.name}?`,
								[
									{
										text: 'No',
										style: 'cancel',
									},
									{
										text: 'Yes',
										onPress: () => toggleSend(),
									},
								],
								{ cancelable: false }
							)
						}
					>
						<Icon
							name='check'
							type='font-awesome'
							size={25}
							iconStyle={styles.deleteText}
							color='#fff'
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.deleteTouchable}
						onPress={() =>
							Alert.alert(
								'Delete To Do?',
								`Remove ${climb.name} from To Do List?`,
								[
									{
										text: 'Cancel',
										style: 'cancel',
									},
									{
										text: 'OK',
										onPress: () => dispatch(toggleToDo(climb.id)),
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
							navigation.navigate('ClimbInfo', { climb })
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
		<SafeAreaView style={styles.screen}>
			<View>
				<Text style={styles.headerTitle}>To Do List</Text>
			</View>
			<FlatList
				data={toDoClimbs}
				renderItem={renderClimbItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	swipeView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1,
	},
	addTouchable: {
		backgroundColor: 'blue',
		height: '100%',
		width: 100,
		justifyContent: 'center',
	},
	addText: {
		color: 'white',
		fontWeight: '700',
		textAlign: 'center',
		width: 100,
	},
	deleteTouchable: {
		backgroundColor: 'red',
		height: '100%',
		width: 100,
		justifyContent: 'center',
	},
	deleteText: {
		color: 'white',
		fontWeight: '700',
		textAlign: 'center',
		width: 100,
	},
	screen: {
		backgroundColor: '#000',
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	headerTitle: {
		color: '#FFFF00',
		paddingVertical: 20,
		fontSize: 32,
		fontWeight: 'bold',
	},
})
export default ToDoScreen
