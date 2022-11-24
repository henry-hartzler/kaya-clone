import { Text, View, StyleSheet, FlatList } from "react-native"
import { SearchBar, Avatar, ListItem } from "react-native-elements"
import { useState } from "react"
import { useSelector } from "react-redux"

const SearchScreen = ({ navigation }) => {
	const [search, setSearch] = useState("")
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
		locations.filter((el) => el.name.includes(""))
	)
	const [filteredClimbs, setFilteredClimbs] = useState(
		climbs.filter((el) => el.name.includes(""))
	)

	const renderLocationItem = ({ item: location }) => {
		return (
			<ListItem
				style={styles.listItem}
				key={location.id}
				onPress={() => {
					navigation.navigate("LocationInfo", { location })
				}}
			>
				<Avatar
					rounded
					source={location.image}
				/>
				<ListItem.Content style={styles.listItemContent}>
					<ListItem.Title>{location.name}</ListItem.Title>
					<ListItem.Subtitle>{location.state}</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		)
	}

	const renderClimbItem = ({ item: climb }) => {
		return (
			<ListItem
				style={styles.listItem}
				key={climb.id}
				onPress={() => {
					navigation.navigate("ClimbInfo", { climb })
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
		<View>
			<SearchBar
				placeholder='Type here'
				onChangeText={updateSearch}
				value={search}
			/>

			{search && filteredLocations.length !== 0 ? (
				<>
					<Text>Locations</Text>
					<FlatList
						data={filteredLocations}
						renderItem={renderLocationItem}
						keyExtractor={(item) => item.id.toString()}
					/>
				</>
			) : (
				<Text>No locations yet</Text>
			)}
			{search && filteredClimbs.length !== 0 ? (
				<>
					<Text>Climbs</Text>
					<FlatList
						data={filteredClimbs}
						renderItem={renderClimbItem}
						keyExtractor={(item) => item.id.toString()}
					/>
				</>
			) : (
				<Text>No climbs yet</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: "#000",
		flex: 1,
		padding: 10,
		justifyContent: "flex-start",
	},
})

export default SearchScreen
