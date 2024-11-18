import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  Button,
  View,
  Image,
  Alert,
  StyleSheet,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const App = () => {
  const [imageUri, setImageUri] = useState(null);

  const pickImageFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Denied",
          "Gallery access is required to select an image."
        );
        return;
      }
  
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.IMAGES, 
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!pickerResult.canceled) {
        const selectedUri = pickerResult.assets?.[0]?.uri;
        if (selectedUri) {
          setImageUri(selectedUri);
          console.log("Gallery image selected:", selectedUri);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to open gallery.");
    }
  };
  
  const captureImageWithCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Denied",
          "Camera access is required to capture an image."
        );
        return;
      }
  
      const cameraResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.IMAGES,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!cameraResult.canceled) {
        const capturedUri = cameraResult.assets?.[0]?.uri;
        if (capturedUri) {
          setImageUri(capturedUri);
          console.log("Camera image captured:", capturedUri);
        }
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      Alert.alert("Error", "Failed to open camera.");
    }
  };
  

  const saveSelectedImage = async () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please select or capture an image first.");
      return;
    }

    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Denied",
          "Media library access is required to save images."
        );
        return;
      }

      await MediaLibrary.createAssetAsync(imageUri);
      Alert.alert("Success", "Image successfully saved!");
      console.log("Saved image URI:", imageUri);
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Error", "Failed to save the image.");
    }
  };

  const floatAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnimation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.Text
        style={[
          styles.floatingText,
          {
            transform: [{ translateY: floatAnimation }],
          },
        ]}
      >
        Sharone Angelica J - 00000069637
      </Animated.Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Select from Gallery"
          onPress={pickImageFromGallery}
          color="#1E90FF"
        />
        <Button
          title="Take a Photo"
          onPress={captureImageWithCamera}
          color="#1E90FF"
        />
        <Button title="Save Image" onPress={saveSelectedImage} color="#1E90FF" />
      </View>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.imagePreview}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  floatingText: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#000000", 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 3, 
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default App;
