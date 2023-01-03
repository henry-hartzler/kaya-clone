import { StyleSheet, View, Image } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native'

const RenderLocation = ({ location }) => {
	const { colors } = useTheme()

	return location ? (
		<Card containerStyle={{ backgroundColor: colors.card, borderWidth: 0 }}>
			<Card.Title
				h2
				style={{ color: colors.text }}
			>
				{location.name}, {location.state}
			</Card.Title>
			<Card.Divider />
			<View style={styles.cardImageView}>
				{/* <Image
					style={styles.cardImage}
					resizeMode='contain'
					source={location.image}
				/> */}
				<Icon
					name='place'
					type='material'
					iconStyle={{ color: colors.text, fontSize: 150 }}
				/>
			</View>
		</Card>
	) : (
		<View />
	)
}

const styles = StyleSheet.create({
	cardRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20,
		marginBottom: 30,
	},
	cardImageView: {
		position: 'relative',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	cardImage: {
		width: '100%',
		height: 175,
	},
})

export default RenderLocation
