import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const database = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
});

database.save({
    key: 'user',
    id: 1,
    data: {
        id: 1,
        name: 'Trung Dang',
        data: '2020/07/15'
    }
});

export default database;
