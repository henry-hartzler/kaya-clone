import {
	Text,
	View,
	StyleSheet,
	FlatList,
	SafeAreaView,
	Modal,
	TouchableOpacity,
} from 'react-native'
import {
	SearchBar,
	Avatar,
	ListItem,
	Icon,
	SpeedDial,
	Rating,
	Input,
	Button,
} from 'react-native-elements'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ScreenHeader from '../features/header/ScreenHeader'
import { useTheme } from '@react-navigation/native'
import { postClimb } from '../features/climbs/climbsSlice'
import { postLocation } from '../features/locations/locationsSlice'

const SearchScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const dispatch = useDispatch()
	const [search, setSearch] = useState('')
	const updateSearch = (search) => {
		setSearch(search)
		setFilteredLocations(
			locations.filter((el) =>
				el.name.toLowerCase().includes(search.toLowerCase())
			)
		)
		setFilteredClimbs(
			climbs.filter((el) =>
				el.name.toLowerCase().includes(search.toLowerCase())
			)
		)
	}

	const locations = useSelector((state) => state.locations.locationsArray)
	const climbs = useSelector((state) => state.climbs.climbsArray)

	const [filteredLocations, setFilteredLocations] = useState(
		locations.filter((el) => el.name.includes(''))
	)
	const [filteredClimbs, setFilteredClimbs] = useState(
		climbs.filter((el) => el.name.includes(''))
	)

	const [climbModalVisible, setClimbModalVisible] = useState(false)
	const [climbName, setClimbName] = useState('')
	const [locationName, setLocationName] = useState('')
	const [grade, setGrade] = useState('')
	const [rating, setRating] = useState(5)
	const [stateInitials, setStateInitials] = useState('')

	const handleAddClimb = () => {
		const climb = {
			name: climbName,
			grade: grade,
			location: locationName,
			rating: rating,
		}
		dispatch(postClimb(climb))
	}

	const handleAddLocation = () => {
		const location = {
			name: locationName,
			state: stateInitials,
		}
		dispatch(postLocation(location))
	}

	const resetForm = () => {
		setClimbName('')
		setLocationName('')
		setGrade('')
		setRating(5)
		setStateInitials('')
		setSearch('')
	}

	const [locationModalVisible, setLocationModalVisible] = useState(false)

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
					icon={{ name: 'landscape', color: '#000' }}
					title='Add Climb'
					onPress={() => setClimbModalVisible(!climbModalVisible)}
					color='#FFFF00'
				/>
				<SpeedDial.Action
					icon={{ name: 'place', color: '#000' }}
					title='Add Location'
					onPress={() => setLocationModalVisible(!locationModalVisible)}
					color='#FFFF00'
				/>
			</SpeedDial>
		)
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

	const renderClimbItem = ({ item: climb }) => {
		return (
			<ListItem
				containerStyle={{
					backgroundColor: colors.card,
					color: colors.text,
					marginVertical: 5,
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
		)
	}

	return (
		<SafeAreaView style={styles.screen}>
			<ScreenHeader />
			<View style={styles.view}>
				<SearchBar
					placeholder='Search by climbs and locations'
					onChangeText={updateSearch}
					value={search}
				/>
			</View>

			<View style={styles.view}>
				{(search && filteredLocations.length !== 0) ||
				(search && filteredClimbs.length !== 0) ? (
					<>
						<Text style={{ color: colors.text }}>Locations</Text>
						<FlatList
							data={filteredLocations}
							renderItem={renderLocationItem}
							keyExtractor={(item) => item._id.toString()}
						/>
						<Text style={{ color: colors.text }}>Climbs</Text>
						<FlatList
							data={filteredClimbs}
							renderItem={renderClimbItem}
							keyExtractor={(item) => item._id.toString()}
						/>
					</>
				) : (
					<View style={{ marginVertical: 100 }}>
						<Icon
							name='search'
							type='font-awesome'
							color={colors.text}
							size={75}
						/>
					</View>
				)}
			</View>
			<SpeedDialIcon />
			<Modal
				animationType='slide'
				transparent={true}
				visible={locationModalVisible}
				onRequestClose={() => setLocationModalVisible(!locationModalVisible)}
			>
				<TouchableOpacity
					style={{ flex: 1 }}
					onPress={() => setLocationModalVisible(!locationModalVisible)}
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
								onChangeText={(text) => setLocationName(text)}
								value={locationName}
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
										setLocationModalVisible(!locationModalVisible),
										resetForm()
								}}
								size='lg'
							/>
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
			<Modal
				animationType='slide'
				transparent={true}
				visible={climbModalVisible}
				onRequestClose={() => setClimbModalVisible(!climbModalVisible)}
			>
				<TouchableOpacity
					style={{ flex: 1 }}
					onPress={() => setClimbModalVisible(!climbModalVisible)}
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
								onChangeText={(text) => setClimbName(text)}
								value={climbName}
								inputStyle={{ color: colors.text }}
							/>
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
								onChangeText={(text) => setLocationName(text)}
								value={locationName}
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
									handleAddClimb(),
										setClimbModalVisible(!climbModalVisible),
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
		backgroundColor: '#000',
		flex: 1,
	},
	view: {
		marginTop: 15,
		marginHorizontal: 20,
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
		marginHorizontal: 20,
		marginVertical: 0,
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

export default SearchScreen
