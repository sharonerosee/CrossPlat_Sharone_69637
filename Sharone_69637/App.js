import React, { useState } from "react";
import { Button, View, Text, Image, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [uri, setUri] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [latestLocation, setLatestLocation] = useState(null);

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUri(result.assets[0].uri);
      console.log("Image selected from gallery:", result.assets[0].uri);
    }
  };

  const handleCameraLaunch = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUri(result.assets[0].uri);
        console.log("Image captured from camera:", result.assets[0].uri);
      }
    } else {
      Alert.alert(
        "Permission Denied",
        "Camera permission is required to use the camera."
      );
    }
  };

  const saveImage = async () => {
    if (!uri) {
      Alert.alert("No image", "Please select or capture an image first.");
      return;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please allow media library access to save images."
      );
      return;
    }

    try {
      await MediaLibrary.createAssetAsync(uri);
      Alert.alert("Success", "Image saved to Pictures folder!");
      console.log("Image saved:", uri);
    } catch (error) {
      Alert.alert("Error", "Failed to save image.");
      console.error(error);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required to access your location."
      );
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date(location.timestamp).toISOString(),
      };

      setLocationData((prevData) => [...prevData, newLocation]);
      setLatestLocation(newLocation);
      Alert.alert(
        "Location Retrieved",
        `Lat: ${newLocation.latitude}, Lon: ${newLocation.longitude}`
      );
      console.log("Location:", newLocation);
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve location.");
      console.error(error);
    }
  };

  const saveToFile = async () => {
    if (locationData.length === 0) {
      Alert.alert("No Data", "Please retrieve some location data first.");
      return;
    }

    const fileContent = locationData
      .map(
        (loc, index) =>
          `#${index + 1} - Latitude: ${loc.latitude}, Longitude: ${
            loc.longitude
          }, Timestamp: ${loc.timestamp}`
      )
      .join("\n");

    const fileName = "location_data.txt";

    try {
      // Minta izin akses ke penyimpanan eksternal di Android
      if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Storage permission is required.");
          return;
        }
      }

      // Tentukan lokasi file di penyimpanan eksternal Android (Download Directory)
      const downloadDir = FileSystem.documentDirectory;
      const fileUri = `${downloadDir}${fileName}`;

      // Menyimpan file ke penyimpanan eksternal (gunakan MediaLibrary jika ingin)
      await FileSystem.writeAsStringAsync(fileUri, fileContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Tampilkan alert dengan lokasi file
      Alert.alert("File Saved", `File saved at: ${fileUri}`);
      console.log("File saved to:", fileUri);
    } catch (error) {
      Alert.alert("Error", "Failed to save file.");
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edwin Fedora Lolo - 00000069568</Text>
      <Button title="Open Gallery" onPress={openImagePicker} />
      <Button title="Open Camera" onPress={handleCameraLaunch} />
      <Button title="Save Image" onPress={saveImage} />
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      ) : null}
      <Button title="Get Location" onPress={getLocation} />
      <Button title="Save to File" onPress={saveToFile} />

      {latestLocation && (
        <Text style={{ marginTop: 20 }}>
          Latest Location: {"\n"}
          Latitude: {latestLocation.latitude} {"\n"}
          Longitude: {latestLocation.longitude} {"\n"}
          Timestamp: {latestLocation.timestamp}
        </Text>
      )}
    </View>
  );
}