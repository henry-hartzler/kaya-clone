import {
	StyleSheet,
	View,
	Image,
	Alert,
	ToastAndroid,
	SafeAreaView,
} from 'react-native'
import { Card, Icon, Rating, SpeedDial, Chip } from 'react-native-elements'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'

const RenderIndividualClimbs = ({
	climb,
	isToDo,
	markToDo,
	markSend,
	isSend,
}) => {
	const SpeedDialIcon = () => {
		const [open, setOpen] = useState(false)
		return (
			<SpeedDial
				isOpen={open}
				icon={{ name: 'add', color: '#000' }}
				openIcon={{ name: 'close', color: '#fff' }}
				onOpen={() => setOpen(!open)}
				onClose={() => setOpen(!open)}
				color={open === false ? '#FFFF00' : '#808080'}
				style={{ marginRight: 20, marginBottom: 20 }}
			>
				<SpeedDial.Action
					icon={{ name: 'list', color: '#fff' }}
					title='To Do'
					onPress={() => {
						if (isSend) {
							Alert.alert(
								'Delete From Sends?',
								`Adding ${climb.name} to your \n"To Do List" will remove it from your Sends.\n\nProceed?`,
								[
									{
										text: 'Cancel',
										style: 'cancel',
									},
									{
										text: 'OK',
										onPress: () => {
											markToDo(),
												Platform.OS === 'ios'
													? Alert.alert(`${climb.name} added to "To Do List"`)
													: ToastAndroid.show(
															`${climb.name} added to "To Do List"`,
															ToastAndroid.SHORT
													  )
										},
									},
								],
								{ cancelable: false }
							)
						} else if (isToDo) {
							markToDo()
							Platform.OS === 'ios'
								? Alert.alert(`${climb.name} removed from "To Do List"`)
								: ToastAndroid.show(
										`${climb.name} removed from "To Do List"`,
										ToastAndroid.SHORT
								  )
						} else {
							markToDo(),
								Platform.OS === 'ios'
									? Alert.alert(`${climb.name} added to "To Do List"`)
									: ToastAndroid.show(
											`${climb.name} added to "To Do List"`,
											ToastAndroid.SHORT
									  )
						}
					}}
					color='#3388FF'
				/>
				<SpeedDial.Action
					icon={{ name: 'check', color: '#fff' }}
					title='Log Send'
					onPress={() => {
						if (isSend) {
							markSend(),
								Platform.OS === 'ios'
									? Alert.alert(`${climb.name} removed from "Sends"`)
									: ToastAndroid.show(
											`${climb.name} removed from "Sends"`,
											ToastAndroid.SHORT
									  )
						} else {
							markSend(),
								Platform.OS === 'ios'
									? Alert.alert(`${climb.name} added to "Sends"`)
									: ToastAndroid.show(
											`${climb.name} added to "Sends"`,
											ToastAndroid.SHORT
									  )
						}
					}}
					color='#50C878'
				/>
			</SpeedDial>
		)
	}

	const ToDoChip = () => {
		const [toDoChip, setToDoChip] = useState(isToDo)
		if (isToDo) {
			return (
				<Chip
					title='To Do'
					containerStyle={{
						marginVertical: 15,
						width: 100,
					}}
					buttonStyle={{ backgroundColor: '#3388FF' }}
					icon={{
						name: 'close',
						type: 'font-awesome',
						size: 20,
						color: '#fff',
					}}
					onPress={() => {
						Alert.alert(
							`Delete?`,
							`Remove ${climb.name} From To-Do List?`,
							[
								{
									text: 'Cancel',
									style: 'cancel',
								},
								{
									text: 'OK',
									onPress: () => {
										markToDo()
										Platform.OS === 'ios'
											? Alert.alert(`${climb.name} removed from "To Do List"`)
											: ToastAndroid.show(
													`${climb.name} removed from "To Do List"`,
													ToastAndroid.SHORT
											  )
									},
								},
							],
							{ cancelable: false }
						)
					}}
					iconRight
				/>
			)
		} else {
			return <></>
		}
	}

	const SendChip = () => {
		const [sendChip, setSendChip] = useState(isSend)

		if (isSend) {
			return (
				<Chip
					title='Sent'
					containerStyle={{
						marginVertical: 15,
						width: 100,
					}}
					buttonStyle={{ backgroundColor: '#50C878' }}
					icon={{
						name: 'check',
						type: 'font-awesome',
						size: 20,
						color: '#fff',
					}}
					iconRight
				/>
			)
		} else {
			return <></>
		}
	}

	const { colors } = useTheme()

	return climb ? (
		<SafeAreaView style={{ flex: 1 }}>
			<Card containerStyle={{ backgroundColor: colors.card }}>
				<Card.Title
					style={{ color: colors.text }}
					h2
				>
					{climb.name}, {climb.grade}
				</Card.Title>
				<Card.Divider />
				<View style={styles.cardImageView}>
					<Image
						style={styles.cardImage}
						resizeMode='contain'
						source={climb.image}
					/>
				</View>
				<Card.Title
					style={{ color: colors.text }}
					h4
				>
					{climb.location}
				</Card.Title>
				<View style={{ marginBottom: 20 }}>
					<Rating
						startingValue={climb.rating}
						readonly
						style={{ alignItems: 'center' }}
						tintColor={colors.card}
					/>
				</View>
				<View style={styles.cardRow}>
					<ToDoChip />
					<SendChip />
				</View>
			</Card>
			<SpeedDialIcon />
		</SafeAreaView>
	) : (
		<View />
	)
}

const styles = StyleSheet.create({
	cardRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	cardImageView: {
		position: 'relative',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	cardImage: {
		width: '100%',
		height: 175,
	},
})

export default RenderIndividualClimbs
