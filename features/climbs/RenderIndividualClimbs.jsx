import { StyleSheet, View, Image, Alert } from 'react-native'
import { Card, Icon, Rating } from 'react-native-elements'
import { useTheme } from '@react-navigation/native'

const RenderIndividualClimbs = ({
	climb,
	isToDo,
	markToDo,
	markSend,
	isSend,
}) => {
	const { colors } = useTheme()
	return climb ? (
		<Card containerStyle={{ backgroundColor: colors.card }}>
			<Card.Title
				style={{ color: colors.text }}
				h2
			>
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
			<Card.Title
				style={{ color: colors.text }}
				h4
			>
				{climb.location}
			</Card.Title>
			<View style={{ marginBottom: 20 }}>
				<Rating
					startingValue={climb.rating}
					readonly
					style={{ alignItems: 'center' }}
					tintColor={colors.card}
				/>
			</View>
			<View style={styles.cardRow}>
				<Icon
					name='list'
					type='font-awesome'
					color={isToDo ? '#3388FF' : '#808080'}
					raised
					reverse
					onPress={() =>
						isSend
							? Alert.alert(
									'Delete From Sends?',
									`Adding ${climb.name} to your \n"To Do List" will remove it from your Sends.\n\nAre you sure?`,
									[
										{
											text: 'Cancel',
											style: 'cancel',
										},
										{
											text: 'OK',
											onPress: () => markToDo(),
										},
									],
									{ cancelable: false }
							  )
							: markToDo()
					}
				/>
				<Icon
					name='check'
					type='font-awesome'
					color={isSend ? '#50C878' : '#808080'}
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

export default RenderIndividualClimbs
