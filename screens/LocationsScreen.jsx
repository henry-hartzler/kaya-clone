import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native'
import { Text } from 'react-native-paper'
import { Avatar, ListItem, Button, Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'

const LocationsScreen = ({ navigation }) => {
	const locations = useSelector((state) => state.locations)

	const renderLocationItem = ({ item: location }) => {
		return (
			<ListItem
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
				<ListItem.Content style={styles.listItemContent}>
					<ListItem.Title>{location.name}</ListItem.Title>
					<ListItem.Subtitle>{location.state}</ListItem.Subtitle>
				</ListItem.Content>
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
				keyExtractor={(item) => item.id.toString()}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	screen: {
		// backgroundColor: "#000",
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
		// color: "#fff",
		paddingBottom: 5,
		fontSize: 22,
	},
	headerTitle: {
		// color: "#FFFF00",
		paddingRight: 50,
		fontSize: 32,
		fontWeight: 'bold',
	},
	listItem: {
		marginVertical: 5,
		// backgroundColor: "#000",
		// color: "#fff",
	},
	listItemContent: {},
})

export default LocationsScreen
