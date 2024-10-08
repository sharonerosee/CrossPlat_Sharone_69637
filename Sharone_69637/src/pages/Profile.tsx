import React from 'react';
import { View, Text, Image, Button } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
    const { userName, email, photo } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={{ uri: photo }}
                style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
            />
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{userName}'s Profile</Text>
            <Text style={{ fontSize: 18, color: 'gray', marginBottom: 20 }}>{email}</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default ProfileScreen;
