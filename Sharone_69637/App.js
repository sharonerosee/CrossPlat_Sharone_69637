import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { getUsers, postData } from './services/axios';
import { useState, useEffect } from "react";

export default function App() {
  const getAllUsers = () => {
    getUsers().then((res) => {
      if (res.status === 200) { // Memperbaiki status code ke 200
        console.log(res.data);
      }
    });
  };

  const handlePostData = () => {
    const data = {
      title: "Title",
      body: "Body",
      userId: 1,
    };

    postData(data).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Sharone Angelica Jovans - 00000069637</Text>
      <Button title="Post Data" onPress={handlePostData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
