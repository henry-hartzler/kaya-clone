import { StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native'
import { Avatar, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const LocationsScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const locations = useSelector((state) => state.locations)

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
})

export default LocationsScreen
