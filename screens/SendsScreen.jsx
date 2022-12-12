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
import { toggleSends } from '../features/sends/sendsSlice'
import { SwipeRow } from 'react-native-swipe-list-view'
import { useTheme } from '@react-navigation/native'

const SendsScreen = ({ navigation }) => {
	const { colors } = useTheme()

	const { climbsArray } = useSelector((state) => state.climbs)

	const sends = useSelector((state) => state.sends)
	const dispatch = useDispatch()

	const sendClimbs = climbsArray.filter((climbs) => sends.includes(climbs.id))

	const renderClimbItem = ({ item: climb }) => {
		return (
			<SwipeRow
				rightOpenValue={-100}
				style={{ marginVertical: 5 }}
			>
				<View style={styles.deleteView}>
					<TouchableOpacity
						style={styles.deleteTouchable}
						onPress={() =>
							Alert.alert(
								'Delete Send?',
								`Remove ${climb.name} from Sends?`,
								[
									{
										text: 'Cancel',
										style: 'cancel',
									},
									{
										text: 'OK',
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
							rounded
							source={climb.image}
						/>
						<ListItem.Content>
							<ListItem.Title style={{ color: colors.text }}>
								{climb.name}, {climb.grade}
							</ListItem.Title>
							<ListItem.Subtitle style={{ color: colors.text }}>
								{climb.location}
							</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				</View>
			</SwipeRow>
		)
	}
	return (
		<SafeAreaView style={styles.screen}>
			<View>
				<Text style={styles.headerTitle}>Sends</Text>
			</View>
			<FlatList
				data={sendClimbs}
				renderItem={renderClimbItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	deleteView: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 1,
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
export default SendsScreen
