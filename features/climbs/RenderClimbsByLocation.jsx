import { Avatar, ListItem } from 'react-native-elements'
import { FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'

const RenderClimbsByLocation = ({ locations }) => {
	const { colors } = useTheme()

	const climbs = useSelector((state) => state.climbs.climbsArray)
	const navigation = useNavigation()

	const filteredClimbs = climbs.filter((el) => el.location === locations.name)

	const renderClimbItem = ({ item: climb }) => {
		return (
			<ListItem
				containerStyle={{
					backgroundColor: colors.card,
					color: colors.text,
					marginVertical: 5,
					marginHorizontal: 20,
				}}
				key={climb.id}
				onPress={() => {
					navigation.navigate('ClimbInfo', { climb })
				}}
			>
				<Avatar
					rounded
					source={climb.image}
				/>
				<ListItem.Content>
					<ListItem.Title style={{ color: colors.text }}>
						{climb.name}
					</ListItem.Title>
					<ListItem.Subtitle style={{ color: colors.text }}>
						{climb.grade}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		)
	}
	return (
		<FlatList
			data={filteredClimbs}
			renderItem={renderClimbItem}
			keyExtractor={(item) => item.id.toString()}
			style={{ marginTop: 10 }}
		/>
	)
}

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#000',
		color: '#fff',
	},
})

export default RenderClimbsByLocation
