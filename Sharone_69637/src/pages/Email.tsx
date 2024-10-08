import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import userData from '../../assets/database/data.json';

const Email = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom:10, backgroundColor: 'pink' }}>
      <FlatList
        data={userData}
        keyExtractor={(item) => item.email} 
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.nama}</Text>
        <Text style={{ fontSize: 18 }}>{item.email}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default Email;
