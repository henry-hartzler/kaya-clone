import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import { Text, List } from 'react-native-paper'
import { SearchBar, Avatar, ListItem } from 'react-native-elements'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ScreenHeader from '../features/header/ScreenHeader'

const SearchScreen = ({ navigation }) => {
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
			<List.Section
				style={styles.listItem}
				key={location.id}
				onPress={() => {
					navigation.navigate('LocationInfo', { location })
				}}
			>
				<Avatar
					rounded
					source={location.image}
				/>
				<List.Item title={location.name} />
			</List.Section>
		)
	}

	const renderClimbItem = ({ item: climb }) => {
		return (
			<ListItem
				style={styles.listItem}
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
					<ListItem.Title>{climb.name}</ListItem.Title>
					<ListItem.Subtitle>{climb.grade}</ListItem.Subtitle>
				</ListItem.Content>
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
				{search && filteredLocations.length !== 0 ? (
					<>
						<Text style={styles.text}>Locations</Text>
						<FlatList
							data={filteredLocations}
							renderItem={renderLocationItem}
							keyExtractor={(item) => item.id.toString()}
						/>
					</>
				) : (
					<Text style={styles.text}>No locations yet</Text>
				)}
			</View>
			<View style={styles.view}>
				{search && filteredClimbs.length !== 0 ? (
					<>
						<Text style={styles.text}>Climbs</Text>
						<FlatList
							data={filteredClimbs}
							renderItem={renderClimbItem}
							keyExtractor={(item) => item.id.toString()}
						/>
					</>
				) : (
					<Text style={styles.text}>No climbs yet</Text>
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	screen: {
		// backgroundColor: "#000",
		flex: 1,
	},
	view: {
		marginTop: 15,
		marginHorizontal: 20,
	},
	text: {
		// color: "#fff",
	},
	header: {
		marginTop: 10,
		marginLeft: 10,
	},
	headerSubtitle: {
		// color: "#fff",
		paddingBottom: 5,
		fontSize: 22,
	},
	headerTitle: {
		color: '#FFFF00',
		paddingRight: 50,
		fontSize: 32,
		fontWeight: 'bold',
	},
	listItem: {
		marginVertical: 5,
		backgroundColor: '#000',
		// color: "#fff",
	},
})

export default SearchScreen
