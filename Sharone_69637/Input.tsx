import {  TextInput, View } from 'react-native';


export const InputNama = ({nama, onChangeText}) => {
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
  
  export const InputNIM = ({nim, onChangeText}) => {
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
          keyboardType='numeric'
          />
      </View>
    );
  };