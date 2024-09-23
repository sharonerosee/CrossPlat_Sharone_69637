import React, { useState } from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from 'expo-font';
import data from './app.json';
import styles from './App.styles.js';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Bold-Italic': require('./assets/fonts/Poppins-BoldItalic.ttf'),
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const dataArray = Array.isArray(data) ? data : Object.values(data);
  if (!dataArray || dataArray.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Data Mahasiswa</Text>
      <ScrollView style={styles.scrollView}>
        {dataArray.map((item, index) => {
          if (!item.email || !item.foto) {
            return null;
          }

          return (
            <TouchableWithoutFeedback
              key={item.nama}
              onPressIn={() => setHoveredIndex(index)}
              onPressOut={() => setHoveredIndex(null)}
            >
              <View style={styles.container}>
                <View style={[
                  styles.card,
                  hoveredIndex === index && styles.cardHovered
                ]}>
                  <Image
                    source={{ uri: item.foto }}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.boldText}>{item.nama}</Text>
                    <Text style={styles.description}>{item.email}</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
