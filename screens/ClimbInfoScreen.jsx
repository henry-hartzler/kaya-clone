import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native'
import RenderIndividualClimbs from '../features/climbs/RenderIndividualClimbs'
import ScreenHeader from '../features/header/ScreenHeader'
import { toggleToDo } from '../features/ToDo/toDoSlice'
import { logSend } from '../features/sends/sendsSlice'

const ClimbInfoScreen = ({ route }) => {
	const { climb } = route.params
	const toDos = useSelector((state) => state.toDos)
	const sends = useSelector((state) => state.sends)
	const toDoClimbs = toDos.includes(climb.name)
	const sendsClimbs = sends.some((e) => e.name === climb.name)
	// const toggleSend = () => {
	// 	if (toDoClimbs) {
	// 		dispatch(toggleToDo(climb))
	// 		dispatch(logSend(climb))
	// 	} else {
	// 		dispatch(logSend(climb))
	// 	}
	// }
	const toggleToDos = () => {
		if (sendsClimbs) {
			dispatch(toggleToDo(climb))
			dispatch(logSend(climb))
		} else {
			dispatch(toggleToDo(climb))
		}
	}
	const dispatch = useDispatch()

	const handleSend = () => {
		const send = {
			name: climb.name,
			grade: climb.grade,
			image: climb.image,
			location: climb.location,
			rating: climb.rating,
		}
		dispatch(logSend(send))
	}

	return (
		<SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
			<ScreenHeader />
			<RenderIndividualClimbs
				climb={climb}
				isToDo={toDos.includes(climb.name)}
				isSend={sendsClimbs}
				markToDo={() => toggleToDos()}
				markSend={() => {
					handleSend(), console.log(sends)
				}}
			/>
		</SafeAreaView>
	)
}

export default ClimbInfoScreen
