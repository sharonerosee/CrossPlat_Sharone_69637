import { StyleSheet, Text, TextInput, View } from 'react-native';
// import Counter from "./Counter";
// import Profile from './Profile';
import { useState } from "react";

const InputNama = ({nama, onChangeText}) => {
  console.log(nama);
  return (
    <View>
      <TextInput
        placeholder='Masukkan nama disini'
        style={{
          borderColor: 'black',
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}
        onChangeText={onChangeText}
        value={nama}
        />
    </View>
  );
};

const InputNIM = ({nim, onChangeText}) => {
  console.log(nim);
  return (
    <View>
      <TextInput
        placeholder='Masukkan nim disini'
        style={{
          borderColor: 'black',
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}
        onChangeText={onChangeText}
        value={nim}
        />
    </View>
  );
};

export default function App(){
  const [nama, setNama] = useState("");
  const handleChangeMyName = (value) => {
    setNama(value);
  };

  const [nim, setNIM] = useState("");
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
