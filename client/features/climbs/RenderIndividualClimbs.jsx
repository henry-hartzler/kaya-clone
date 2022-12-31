import {
	StyleSheet,
	View,
	Image,
	Alert,
	SafeAreaView,
	Modal,
	Text,
} from 'react-native'
import {
	Card,
	Rating,
	SpeedDial,
	Chip,
	Button,
	Input,
	Icon,
} from 'react-native-elements'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch } from 'react-redux'
import { logSend } from '../sends/sendsSlice'
import { postToDo, removeToDo } from '../ToDo/toDoSlice'

const RenderIndividualClimbs = ({ climb, isToDo, isSend }) => {
	const dispatch = useDispatch()

	const handleAddToDo = () => {
		const toDoClimb = {
			climbId: climb._id.toString(),
			name: climb.name,
		}
		dispatch(postToDo(toDoClimb))
	}

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
								'Add to To Do?',
								`You have already sent ${climb.name} 👊 \nAdd it to your To Do List anyway?\n`,
								[
									{
										text: 'Cancel',
										style: 'cancel',
									},
									{
										text: 'OK',
										onPress: () => {
											handleAddToDo(), setOpen(!open)
										},
									},
								],
								{ cancelable: false }
							)
						} else {
							handleAddToDo(), setOpen(!open)
						}
					}}
					color='#3388FF'
				/>
				<SpeedDial.Action
					icon={{ name: 'check', color: '#fff' }}
					title='Log Send'
					onPress={() => setModalVisible(!modalVisible)}
					color='#50C878'
				/>
			</SpeedDial>
		)
	}

	const ToDoChip = () => {
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
							`Remove ${climb.name} From To Do List?`,
							[
								{
									text: 'Cancel',
									style: 'cancel',
								},
								{
									text: 'OK',
									onPress: () => dispatch(removeToDo(climb._id)),
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
	const [modalVisible, setModalVisible] = useState(false)
	const [comment, setComment] = useState('')
	const [rating, setRating] = useState(5)
	const [date, setDate] = useState(new Date())
	const [showCalendar, setShowCalendar] = useState(false)

	const onDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date
		setShowCalendar(Platform.OS === 'ios')
		setDate(currentDate)
	}

	const resetForm = () => {
		setRating(5)
		setComment('')
		setDate(new Date())
	}

	const handleSend = () => {
		const send = {
			name: climb.name,
			grade: climb.grade,
			// image: climb.image,
			location: climb.location,
			rating: rating,
			date: date.toLocaleDateString('en-US'),
			comment: comment,
		}
		dispatch(logSend(send))
		if (isToDo) {
			dispatch(removeToDo(climb._id))
		}
	}

	return climb ? (
		<SafeAreaView style={{ flex: 1 }}>
			<Card containerStyle={{ backgroundColor: colors.card, borderWidth: 0 }}>
				<Card.Title
					style={{ color: colors.text }}
					h2
				>
					{climb.name}, {climb.grade}
				</Card.Title>
				<Card.Divider />
				<View style={styles.cardImageView}>
					{/* <Image
						style={styles.cardImage}
						resizeMode='contain'
						source={climb.image}
					/> */}
					<Icon
						name='landscape'
						type='material'
						iconStyle={{ color: colors.text, fontSize: 150 }}
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
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}
			>
				<View
					style={{
						backgroundColor: '#000',
						position: 'absolute',
						bottom: 0,
						width: '100%',
						alignItems: 'center',
						justifyContent: 'flex-end',
						marginBottom: 20,
					}}
				>
					<View style={styles.formTitle}>
						<Text
							style={{ color: colors.text, fontSize: 24, fontWeight: 'bold' }}
						>
							You sent! 👊
						</Text>
					</View>
					<View style={styles.formTitle}>
						<Text
							style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}
						>
							Add some details below to log your send.
						</Text>
					</View>
					<View style={styles.formRow}>
						<Text style={styles.formLabel}>Rating:</Text>
						<Rating
							startingValue={rating}
							imageSize={40}
							onFinishRating={(rating) => setRating(rating)}
							style={{ paddingVertical: 10 }}
							tintColor='#000'
						/>
					</View>
					<View style={styles.formRow}>
						<Text style={styles.formLabel}>Date:</Text>
						<Button
							onPress={() => setShowCalendar(!showCalendar)}
							title={date.toLocaleDateString('en-US')}
							buttonStyle={{ backgroundColor: '#FFFF00' }}
							titleStyle={{ color: '#000' }}
						/>
					</View>
					{showCalendar && (
						<DateTimePicker
							style={styles.formItem}
							value={date}
							mode='date'
							display='default'
							onChange={onDateChange}
						/>
					)}
					<View style={styles.formRow}>
						<Input
							placeholder='Comment'
							leftIcon={{
								type: 'font-awesome',
								name: 'comment-o',
							}}
							leftIconContainerStyle={{ paddingRight: 10 }}
							onChangeText={(text) => setComment(text)}
							value={comment}
							inputStyle={{ color: colors.text }}
						/>
					</View>
					<View style={styles.formRow}>
						<Button
							buttonStyle={{ backgroundColor: '#FFFF00', width: '100%' }}
							titleStyle={{ color: '#000' }}
							title='Done'
							onPress={() => {
								handleSend(), setModalVisible(!modalVisible), resetForm()
							}}
							size='lg'
						/>
					</View>
				</View>
			</Modal>
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
	formRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20,
	},
	formLabel: {
		fontSize: 18,
		flex: 2,
		color: '#fff',
	},
	formItem: {
		flex: 1,
	},
	formTitle: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 0,
		marginHorizontal: 20,
	},
})

export default RenderIndividualClimbs
