import { View, Text, StyleSheet, FlatList } from "react-native"
import { ListItem, Avatar } from "react-native-elements"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"

const ForYouScreen = () => {
	const toDos = useSelector((state) => state.toDos)
	const navigation = useNavigation()

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
			data={toDos}
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
export default ForYouScreen
