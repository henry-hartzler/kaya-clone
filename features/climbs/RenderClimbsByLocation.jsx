import { Avatar, ListItem } from "react-native-elements"
import { FlatList, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"

const RenderClimbsByLocation = ({ locations }) => {
	const climbs = useSelector((state) => state.climbs.climbsArray)
	const navigation = useNavigation()

	const filteredClimbs = climbs.filter((el) => el.location === locations.name)

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
		<FlatList
			data={filteredClimbs}
			renderItem={renderClimbItem}
			keyExtractor={(item) => item.id.toString()}
		/>
	)
}

const styles = StyleSheet.create({
	listItem: {
		marginVertical: 5,
		backgroundColor: "#000",
		color: "#fff",
	},
	listItemContent: {},
})

export default RenderClimbsByLocation
