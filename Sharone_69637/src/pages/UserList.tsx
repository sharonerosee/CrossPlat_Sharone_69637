import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import userData from '../../assets/database/data.json';
import styles from '../../App.styles';
import Animated, { SlideInLeft, SlideInRight, SlideInDown } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

const UserList = ({ navigation }) => {
    const userArray = Object.values(userData);

    const [animationKey, setAnimationKey] = useState(0);
    useFocusEffect(
        React.useCallback(() => {
            // Memicu ulang animasi dengan mengganti kunci animasi
            setAnimationKey(prevKey => prevKey + 1);
        }, [])
    );

    const renderAnimatedItem = ({ item, index }) => {
        // Menentukan animasi yang digunakan berdasarkan indeks item
        let animationStyle;
        if (index % 3 === 0) {
            animationStyle = SlideInLeft;
        } else if (index % 3 === 1) {
            animationStyle = SlideInRight;
        } else {
            animationStyle = SlideInDown;
        }

        return (
            <Animated.View
                key={animationKey}
                entering={animationStyle.duration(500 + index * 100)}
                style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Profile', {
                            userName: item.nama,
                            email: item.email,
                            photo: item.foto,
                        })
                    }
                >
                    <Image source={{ uri: item.foto }} style={styles.avatar} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{item.nama}</Text>
                        <Text>{item.email}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={userArray}
                keyExtractor={(item) => item.email}
                renderItem={renderAnimatedItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default UserList;
