import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Alert,
	SafeAreaView,
} from 'react-native'
import { ListItem, Avatar, Icon, FAB, Rating } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { removeSend } from '../features/sends/sendsSlice'
import { SwipeRow } from 'react-native-swipe-list-view'
import { useTheme } from '@react-navigation/native'

const SendsScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const sendsArray = useSelector((state) => state.sends)
	const sendsByDate = sendsArray.slice().sort(function (a, b) {
		return new Date(b.date) - new Date(a.date)
	})
	const dispatch = useDispatch()

	const renderClimbItem = ({ item: climb }) => {
		return (
			<SwipeRow
				rightOpenValue={-80}
				disableRightSwipe
				rightActivationValue={-150}
				onRightAction={() =>
					Alert.alert(
						'Delete Send?',
						`Remove this send of ${climb.name}?`,
						[
							{
								text: 'Cancel',
								style: 'cancel',
							},
							{
								text: 'OK',
								onPress: () => dispatch(removeSend(climb)),
							},
						],
						{ cancelable: false }
					)
				}
				style={{ marginVertical: 5 }}
			>
				<View style={styles.deleteView}>
					<TouchableOpacity
						style={styles.deleteTouchable}
						onPress={() =>
							Alert.alert(
								'Delete Send?',
								`Remove this send of ${climb.name}?`,
								[
									{
										text: 'Cancel',
										style: 'cancel',
									},
									{
										text: 'OK',
										onPress: () => dispatch(removeSend(climb)),
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
							<ListItem.Subtitle style={{ color: colors.text }}>
								{climb.date}
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
				<Text style={styles.headerTitle}>Sends</Text>
			</View>
			<FlatList
				data={sendsByDate}
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
	deleteView: {
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
export default SendsScreen
