import {
	SafeAreaView,
	View,
	TouchableOpacity,
	Text,
	Modal,
	StyleSheet,
} from 'react-native'
import { Input, FAB, Button, Rating } from 'react-native-elements'
import RenderLocation from '../features/locations/RenderLocation'
import RenderClimbsByLocation from '../features/climbs/RenderClimbsByLocation'
import ScreenHeader from '../features/header/ScreenHeader'
import { useTheme } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { postClimb } from '../features/climbs/climbsSlice'

const LocationInfoScreen = ({ route }) => {
	const { location } = route.params
	const { colors } = useTheme()
	const dispatch = useDispatch()

	const [modalVisible, setModalVisible] = useState(false)
	const [name, setName] = useState('')
	const [grade, setGrade] = useState('')
	const [rating, setRating] = useState(5)

	const handleAddClimb = () => {
		const climb = {
			name: name,
			grade: grade,
			location: location.name,
			rating: rating,
		}
		dispatch(postClimb(climb))
	}

	const resetForm = () => {
		setName('')
		setGrade('')
		setRating(5)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScreenHeader />
			<RenderLocation location={location} />
			<RenderClimbsByLocation locations={location} />
			<FAB
				placement='right'
				color='#FFFF00'
				style={{ marginRight: 20, marginBottom: 20 }}
				icon={{ name: 'add', color: '#000' }}
				onPress={() => setModalVisible(!modalVisible)}
			/>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}
			>
				<TouchableOpacity
					style={{ flex: 1 }}
					onPress={() => setModalVisible(!modalVisible)}
				>
					<View
						style={{
							backgroundColor: '#000',
							position: 'absolute',
							bottom: 0,
							width: '100%',
							alignItems: 'center',
							justifyContent: 'flex-end',
							marginBottom: 10,
						}}
					>
						<View style={styles.formTitle}>
							<Text
								style={{ color: colors.text, fontSize: 24, fontWeight: 'bold' }}
							>
								Add a new climb
							</Text>
						</View>
						<Text style={styles.formRow}>Name:</Text>
						<View style={styles.formRow}>
							<Input
								placeholder='Name'
								leftIcon={{
									type: 'font-awesome',
									name: 'comment-o',
								}}
								leftIconContainerStyle={{ paddingRight: 10 }}
								onChangeText={(text) => setName(text)}
								value={name}
								inputStyle={{ color: colors.text }}
							/>
						</View>
						<Text style={styles.formRow}>V-Grade (ex: V5):</Text>
						<View style={styles.formRow}>
							<Input
								placeholder='Grade'
								leftIcon={{
									type: 'font-awesome',
									name: 'comment-o',
								}}
								leftIconContainerStyle={{ paddingRight: 10 }}
								onChangeText={(text) => setGrade(text)}
								value={grade}
								inputStyle={{ color: colors.text }}
							/>
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
							<Button
								buttonStyle={{ backgroundColor: '#FFFF00', width: '100%' }}
								titleStyle={{ color: '#000' }}
								title='Done'
								onPress={() => {
									handleAddClimb(), setModalVisible(!modalVisible), resetForm()
								}}
								size='lg'
							/>
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	formRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: 20,
		marginVertical: 10,
		fontSize: 18,
		color: '#fff',
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

export default LocationInfoScreen
