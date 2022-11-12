import { StyleSheet, View, Text, Platform } from "react-native";
import Constants from 'expo-constants';

const Main = () => {
    return (
        <>
            <View style={{ 
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}>
                <Text>Navigators will go here</Text>
            </View>
        </>
      );
}

const styles = StyleSheet.create({
    mainFooter: {
        backgroundColor: 'black',
        color: '#fff',
        padding: 20
    }
})
 
export default Main;