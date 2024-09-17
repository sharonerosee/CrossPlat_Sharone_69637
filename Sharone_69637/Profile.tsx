import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IProfile{
    nama: string;
    umur: number;
}

const Profile = ({nama, umur}: IProfile)=>{
  return(
    <View style={styles.container}>
        <Text style={styles.text}>Halo namaku, {nama}!</Text>
        <Text style={styles.text}>Umurku, {umur} tahun.</Text>
    </View>
  ); 
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    text: {
        fontSize: 20,
    },
});

export default Profile;