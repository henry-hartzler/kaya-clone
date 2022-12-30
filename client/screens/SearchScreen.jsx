import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import { SearchBar, Avatar, ListItem, Icon } from 'react-native-elements'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ScreenHeader from '../features/header/ScreenHeader'
import { useTheme } from '@react-navigation/native'

const SearchScreen = ({ navigation }) => {
	const { colors } = useTheme()

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
})

export default SearchScreen
