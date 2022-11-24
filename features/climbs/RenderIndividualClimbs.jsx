import {
	StyleSheet,
	Text,
	View,
	PanResponder,
	Alert,
	Share,
	Image,
} from "react-native"
import { Card, Icon, Rating } from "react-native-elements"

const RenderIndividualClimbs = ({ climb }) => {
	return climb ? (
		<Card style={{ flex: 1 }}>
			<Card.Title h1>
				{climb.name}, {climb.grade}
			</Card.Title>
			<Card.Divider />
			<View style={styles.cardImageView}>
				<Image
					style={styles.cardImage}
					resizeMode='contain'
					source={climb.image}
				/>
			</View>
			<Card.Title h4>{climb.location}</Card.Title>
			<View style={{ marginBottom: 20 }}>
				<Rating
					startingValue={climb.rating}
					readonly
					style={{ alignItems: "center" }}
				/>
			</View>
			<View style={styles.cardRow}>
				<Icon
					name='list'
					type='font-awesome'
					color='#f50'
					raised
					reverse
					onPress={() => console.log("pressed")}
				/>
				<Icon
					name='check'
					type='font-awesome'
					color='#5637DD'
					raised
					reverse
					onPress={() => console.log("pressed")}
				/>
			</View>
		</Card>
	) : (
		<View />
	)
}

const styles = StyleSheet.create({
	cardRow: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
		margin: 20,
		marginBottom: 30,
	},
	cardImageView: {
		position: "relative",
		alignItems: "center",
		marginBottom: 20,
	},
	cardImage: {
		width: "100%",
		height: 175,
	},
})

export default RenderIndividualClimbs
