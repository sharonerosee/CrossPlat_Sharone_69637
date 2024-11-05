import axios from "axios";

const ENV = process.env.EXPO_PUBLIC_API_URL;

export const getPosts = async () => {
  const response = await axios.get(ENV + "/posts");
  return response.data;
};

export const updatePost = async (
  postId: number,
  updatedData: { title: string; body: string }
) => {
  const response = await axios.put(ENV + `/posts/${postId}`, updatedData);
  return response.data;
};