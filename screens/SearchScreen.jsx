import { Text, View, StyleSheet } from 'react-native';
import { SearchBar, Avatar, ListItem } from 'react-native-elements';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const SearchScreen = () => {
    const [search, setSearch] = useState('');
    const updateSearch = search => {
        setSearch(search)
        setFilteredLocations(locations.filter(el => el.name.includes(search)))
    }

    const locations = useSelector(state => state.locations.locationsArray)
    const [filteredLocations, setFilteredLocations] = useState(
        locations.filter(el => el.name.includes('m')))


    return (
        <View>
            <SearchBar 
                placeholder='Type here'
                onChangeText={updateSearch}
                value={search}
            />
            <Text>Locations</Text>
            {filteredLocations 
            ? filteredLocations.map(location => (
                <ListItem 
                    style={styles.listItem} 
                    key={location.id}
                >
                    <Avatar rounded source={location.image} />
                    <ListItem.Content style={styles.listItemContent}>
                        <ListItem.Title>{location.name}</ListItem.Title>
                        <ListItem.Subtitle>{location.state}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))
            : <Text>No locations yet</Text>}
            <Text>Climbs</Text>
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
    },
    listItem: {
        marginVertical: 5,
        backgroundColor: '#000',
        color: '#fff'
    },
    listItemContent: {
        
    }

})
 
export default SearchScreen;