import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./services/types";
import { getPosts } from "./services/axios";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [posts, setPosts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#3D3D3D",
      },
      headerTintColor: "#fff", 
    });
  }, [navigation]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const updatePostInState = (updatedPost: {
    id: number;
    title: string;
    body: string;
  }) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Forms", {
                post: item,
                updatePost: updatePostInState,
              })
            }
            style={{
              padding: 16,
              marginVertical: 8,
              backgroundColor: "#F64A8A", 
              borderRadius: 8,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
              {item.title}
            </Text>
            <Text style={{ color: "#fff" }}>{item.body}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
