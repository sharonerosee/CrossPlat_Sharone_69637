import { PermissionsAndroid, StyleSheet, Text, TextInput, View } from 'react-native';
import Counter from "./Counter";
import Profile from './Profile';
import { useState } from "react";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function App() {
  const [uri, setUri] = useState("");

  const openImageLibrary = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      handleResponse
    );
  };

  const handleCameraLaunch = () => {
    launchCamera(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      handleResponse
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera to take photos.",
          buttonNeutral: "Ask Me Later",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
        handleCameraLaunch();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.errorCode) {
      console.log("Image picker error: ", response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri;
      setUri(imageUri);
    } else {
      console.log("No assets found in the response");
    }
  }

  // return (
  //   <View style={styles.container}>
  //     {/* Your UI components here */}
  //   </View>
  // );
};
