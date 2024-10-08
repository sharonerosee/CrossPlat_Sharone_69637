import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import userData from '../../assets/database/data.json';
import styles from '../../App.styles';

const UserList = ({ navigation }) => {
    // Convert userData object to an array
    const userArray = Object.values(userData);

    return (
        <View style={styles.container}>
            <FlatList
                data={userArray}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Profile', { userName: item.nama, email: item.email, photo: item.foto })}>
                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: item.foto }} 
                                style={styles.avatar}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>{item.nama}</Text>
                                <Text>{item.email}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default UserList;
