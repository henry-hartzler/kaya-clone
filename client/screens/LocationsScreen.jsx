import {
	StyleSheet,
	SafeAreaView,
	View,
	Text,
	FlatList,
	Modal,
	TouchableOpacity,
} from 'react-native'
import {
	Avatar,
	ListItem,
	Button,
	Icon,
	FAB,
	Input,
} from 'react-native-elements'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { postLocation } from '../features/locations/locationsSlice'

const LocationsScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const locations = useSelector((state) => state.locations)
	const dispatch = useDispatch()

	const [modalVisible, setModalVisible] = useState(false)
	const [name, setName] = useState('')
	const [stateInitials, setStateInitials] = useState('')

	const handleAddLocation = () => {
		const location = {
			name: name,
			state: stateInitials,
		}
		dispatch(postLocation(location))
	}

	const resetForm = () => {
		setName('')
		setStateInitials('')
	}

	const renderLocationItem = ({ item: location }) => {
		return (
			<ListItem
				containerStyle={{
					backgroundColor: colors.card,
					color: colors.text,
					marginVertical: 5,
				}}
				key={location._id}
				onPress={() => {
					navigation.navigate('LocationInfo', { location })
				}}
			>
				<Avatar
					icon={{ name: 'place', type: 'material' }}
					size={'medium'}
					containerStyle={{
						backgroundColor: colors.card,
						color: colors.text,
					}}
				/>
				<ListItem.Content>
					<ListItem.Title style={{ color: colors.text }}>
						{location.name}
					</ListItem.Title>
					<ListItem.Subtitle style={{ color: colors.text }}>
						{location.state}
					</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
		)
	}

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.header}>
				<Text style={styles.headerSubtitle}>Hi, Henry</Text>
				<Text style={styles.headerTitle}>WHERE ARE YOU CLIMBING TODAY?</Text>
			</View>
			<View style={{ padding: 10 }}>
				<Button
					title='Search by climbs and locations'
					buttonStyle={{ backgroundColor: '#424449' }}
					icon={
						<Icon
							name='search'
							type='font-awesome'
							size={18}
							iconStyle={{ width: 24 }}
							color='#fff'
						/>
					}
					iconPosition='left'
					raised
					onPress={() => navigation.navigate('Search')}
				/>
			</View>
			<FlatList
				data={locations.locationsArray}
				renderItem={renderLocationItem}
				keyExtractor={(item) => item._id.toString()}
			/>
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
							marginBottom: 40,
						}}
					>
						<View style={styles.formTitle}>
							<Text
								style={{ color: colors.text, fontSize: 24, fontWeight: 'bold' }}
							>
								Add a new climbing location
							</Text>
						</View>
						<Text style={styles.formRow}>Location name:</Text>
						<View style={styles.formRow}>
							<Input
								placeholder='Location name'
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
						<Text style={styles.formRow}>State abbreviation (ex: UT):</Text>
						<View style={styles.formRow}>
							<Input
								placeholder='2-letter state abbreviation'
								leftIcon={{
									type: 'font-awesome',
									name: 'comment-o',
								}}
								leftIconContainerStyle={{ paddingRight: 10 }}
								onChangeText={(text) => setStateInitials(text)}
								value={stateInitials}
								inputStyle={{ color: colors.text }}
							/>
						</View>
						<View style={styles.formRow}>
							<Button
								buttonStyle={{ backgroundColor: '#FFFF00', width: '100%' }}
								titleStyle={{ color: '#000' }}
								title='Done'
								onPress={() => {
									handleAddLocation(),
										setModalVisible(!modalVisible),
										resetForm()
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
	screen: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: 'flex-start',
	},
	header: {
		marginTop: 10,
		marginLeft: 10,
	},
	headerSubtitle: {
		color: '#fff',
		paddingBottom: 5,
		fontSize: 22,
	},
	headerTitle: {
		color: '#FFFF00',
		paddingRight: 50,
		fontSize: 32,
		fontWeight: 'bold',
	},
	formRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20,
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

export default LocationsScreen
