import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { savePhotoUriAndLocationToFirestore } from "./firestoreFunction";
import { withDevTools } from 'react-devtools-core';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [uri, setUri] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Local notifications are fully supported without push token.
    console.log("Local notifications enabled for testing.");
  }, []);

  const handleCameraLaunch = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to enable permission to access the camera."
      );
      return;
    }

    const response = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!response.canceled && response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri;
      setUri(imageUri);
      console.log("Image URI:", imageUri);
    } else {
      Alert.alert("Cancelled", "No photo was taken.");
    }
  };

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to enable permission to access the photo library."
      );
      return;
    }

    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!response.canceled && response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri;
      setUri(imageUri);
      console.log("Image URI:", imageUri);
    } else {
      Alert.alert("Cancelled", "No image was selected.");
    }
  };

  const saveDataWithNotification = async () => {
    if (!uri) {
      Alert.alert(
        "No image selected",
        "Please capture or select an image first."
      );
      return;
    }

    try {
      const locationPermission =
        await Location.requestForegroundPermissionsAsync();
      if (!locationPermission.granted) {
        Alert.alert("Permission Denied", "Location access is required.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const locationData = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      setLocation(locationData);

      await savePhotoUriAndLocationToFirestore(uri, locationData);
      Alert.alert("Success", "Data saved successfully!");

      // Schedule a local notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Data Saved",
          body: `Location: ${locationData.latitude}, ${locationData.longitude}`,
          data: { uri },
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save data.");
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Error",
          body: "Failed to save data.",
        },
        trigger: null,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edwin Fedora Lolo - 00000069568</Text>
      <Button
        title="Open Camera"
        onPress={handleCameraLaunch}
        color="#1E90FF"
      />
      <Button title="Open Gallery" onPress={openImagePicker} color="#1E90FF" />

      {uri ? (
        <>
          <Image source={{ uri }} style={styles.image} />
          <Button
            title="Save to Firestore"
            onPress={saveDataWithNotification}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDE2E4",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#C8553D",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FAD4D8",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#C8553D",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  locationText: {
    marginTop: 20,
    color: "#C8553D",
    textAlign: "center",
  },
});

export default App;
