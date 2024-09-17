import { StyleSheet, Text, TextInput, View } from 'react-native';
import Counter from "./Counter";
import Profile from './Profile';
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [nama, setNama] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const handleIncrement = () => {
    setCount(count+1);
  };
  
  const handleDecrement = () => {
    setCount(count-1);
  };

  const handlePassValue = () => {
    setShowProfile(true);
  };

  return(
    <View style={styles.container}>
      {showProfile && <Profile nama={nama} umur={count}/>}
      <Counter
       value={count}
       handleDecrement={handleDecrement}
       handleIncrement={handleIncrement}
       handlePassValue={handlePassValue}
      />
      <TextInput 
      style={styles.input}
      placeholder="Input your name here"
      value={nama}
      onChangeText={setNama}
      />
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
  },
  input:{
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    width: '80%',
    marginVertical: 10,
    borderRadius: 5,
    textAlign: 'center',
  },

});
