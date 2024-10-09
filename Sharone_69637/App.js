import { StyleSheet, Text, TextInput, View } from 'react-native';
import {InputNIM, InputNama} from './Input';
import { useState } from "react";


export default function App(){
  const [nama, setNama] = useState("Nama Mahasiswa");
  const handleChangeMyName = (value) => {
    setNama(value);
  };

  const [nim, setNIM] = useState("NIM Mahasiswa");
  const handleChangeMyNIM = (value) => {
    setNIM(value);
  };

  return (
    <View style={styles.container}>
      <Text>{nama} - {nim} </Text>
      <InputNama nama={nama} onChangeText={handleChangeMyName}/>
      <InputNIM nim={nim} onChangeText={handleChangeMyNIM}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  }
});
