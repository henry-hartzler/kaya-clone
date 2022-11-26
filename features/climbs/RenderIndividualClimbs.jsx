import { StyleSheet, View, Image } from "react-native"
import { Card, Icon, Rating } from "react-native-elements"

const RenderIndividualClimbs = ({
	climb,
	isToDo,
	markToDo,
	markSend,
	isSend,
}) => {
	return climb ? (
		<Card>
			<Card.Title h2>
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
					color={isToDo ? "#3388FF" : "#808080"}
					raised
					reverse
					onPress={() => markToDo()}
				/>
				<Icon
					name='check'
					type='font-awesome'
					color={isSend ? "#50C878" : "#808080"}
					raised
					reverse
					onPress={() => markSend()}
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
