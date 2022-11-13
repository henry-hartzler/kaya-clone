import {
    StyleSheet, 
    View, 
    Text
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const LocationsScreen = () => {
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerSubtitle}>
                    Hi, Henry
                </Text>
                <Text style={styles.headerTitle}>
                    WHERE ARE YOU CLIMBING TODAY?
                </Text>
            </View>
            <View style={{ padding: 10 }}>
                <SearchBar 
                    round
                    
                    placeholder='Climbs, locations, and people'
                />
            </View>
            
        </View>
      );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#000',
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start'
    },
    header: {
        marginTop: 10,
        marginLeft: 10
    },
    headerSubtitle: {
        color:'#fff',
        paddingBottom: 5,
        fontSize: 22
    },
    headerTitle: {
        color: '#FFFF00',
        paddingRight: 50,
        fontSize: 32,
        fontWeight: 'bold'    
    }
})
 
export default LocationsScreen;