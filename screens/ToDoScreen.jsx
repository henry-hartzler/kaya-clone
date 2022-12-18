import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Alert,
	SafeAreaView,
} from 'react-native'
import { ListItem, Avatar, Icon, FAB } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { toggleToDo } from '../features/ToDo/toDoSlice'
import { SwipeRow } from 'react-native-swipe-list-view'
import { useTheme } from '@react-navigation/native'

const ToDoScreen = ({ navigation }) => {
	const { colors } = useTheme()

	const { climbsArray } = useSelector((state) => state.climbs)
	const toDos = useSelector((state) => state.toDos)
	const dispatch = useDispatch()
	const toDoClimbs = climbsArray.filter((climbs) => toDos.includes(climbs.id))

	const renderClimbItem = ({ item: climb }) => {
		//these may be helpful in ClimbInfoScreen for the Speeddial
		// const inToDoClimbs = toDos.includes(climb.id)
		// const toggleSend = () => {
		// 	if (inToDoClimbs) {
		// 		dispatch(toggleToDo(climb.id))
		// 		dispatch(toggleSends(climb.id))
		// 	} else {
		// 		dispatch(toggleSends(climb.id))
		// 	}
		// }
		return (
			<SwipeRow
				rightOpenValue={-80}
				disableRightSwipe
				rightActivationValue={-200}
				onRightAction={() => dispatch(toggleToDo(climb.id))}
				style={{ marginVertical: 5 }}
			>
				<View style={styles.swipeView}>
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
						containerStyle={{
							backgroundColor: colors.card,
							color: colors.text,
						}}
						key={climb.id}
						onPress={() => {
							navigation.navigate('ClimbInfo', { climb })
						}}
					>
						<Avatar
							icon={{ name: 'landscape', type: 'material' }}
							size={'medium'}
							containerStyle={{
								backgroundColor: colors.card,
								color: colors.text,
							}}
						/>
						<ListItem.Content>
							<ListItem.Title style={{ color: colors.text }}>
								{climb.name}, {climb.grade}
							</ListItem.Title>
							<ListItem.Subtitle style={{ color: colors.text }}>
								{climb.location}
							</ListItem.Subtitle>
						</ListItem.Content>
						<ListItem.Chevron />
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
			<FAB
				placement='right'
				color='#FFFF00'
				style={{ marginRight: 20, marginBottom: 20 }}
				icon={{ name: 'add', color: '#000' }}
				onPress={() => navigation.navigate('Search')}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	swipeView: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 1,
	},
	deleteTouchable: {
		backgroundColor: 'red',
		height: '100%',
		width: '90%',
		justifyContent: 'center',
	},
	deleteText: {
		color: 'white',
		fontWeight: '700',
		textAlign: 'right',
		width: '80%',
	},
	screen: {
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
