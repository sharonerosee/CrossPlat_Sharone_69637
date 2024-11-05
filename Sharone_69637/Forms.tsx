import React, { useState, useLayoutEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./services/types";
import { updatePost as updatePostOnServer } from "./services/axios";
import { StackNavigationProp } from "@react-navigation/stack";

type FormsScreenRouteProp = RouteProp<RootStackParamList, "Forms">;
type FormsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Forms"
>;

const Forms = () => {
  const route = useRoute<FormsScreenRouteProp>();
  const navigation = useNavigation<FormsScreenNavigationProp>();

  const { post, updatePost } = route.params;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#01796f",
      },
      headerTintColor: "#fff",
    });
  }, [navigation]);


  const handleUpdate = async () => {
    try {
      const responsePost = await updatePostOnServer(post.id, { title, body });

      updatePost(responsePost);

      Alert.alert("Success", "Post updated successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to update post");
    }
  };

  return (
    <View style={{ padding: 16, backgroundColor: "black", flex: 1 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#fff"
        style={{
          marginBottom: 16,
          padding: 8,
          borderColor: "neon",
          borderWidth: 1,
          borderRadius: 4,
          color: "#fff",
          backgroundColor: "#333",
        }}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Body"
        placeholderTextColor="#fff"
        style={{
          marginBottom: 16,
          padding: 8,
          borderColor: "neon",
          borderWidth: 1,
          borderRadius: 4,
          color: "#fff",
          backgroundColor: "#333",
        }}
        multiline
      />
      <Button title="Update Post" color="#01796f" onPress={handleUpdate} />
    </View>
  );
};

export default Forms;
