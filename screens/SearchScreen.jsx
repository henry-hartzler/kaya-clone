import { Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';

const SearchScreen = () => {
    const [search, setSearch] = useState('');
    const updateSearch = search => setSearch(search)

    return (
        <View>
            <SearchBar 
                placeholder='Type here'
                onChangeText={updateSearch}
                value={search}
            />
            <Text>Locations</Text>
            <Text>Climbs</Text>
        </View>
        
    );
}
 
export default SearchScreen;