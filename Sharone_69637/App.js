import { Text, View, Image, ScrollView } from 'react-native';
import data from './app.json'
import styles from './App.styles.js'

export default function App() {
  return (
    <ScrollView>
      {data.map((data) => {
        return(
          <View style={styles.container} key={data.nama}>
            <View style={styles.card}>
              <Image
                source={{
                  uri: data.foto,
                }}
                style={styles.avatar}
                />
                <View style={styles.boldText}>
                  <Text style={styles.boldText}>{data.nama}</Text>
                  <Text>{data.email}</Text>
                </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 5,
//     display: 'flex',
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 8,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: "center",
//     padding: 8,
//     width: 325,
//     gap: 8,
//   },
//   avatar:{
//     width: 75,
//     heigh: 75,
//     borderRadius: 999,
//    },
//    boldText:{
//     fontWeight: 'bold',
//    },
//    description:{
//     width: 'fit-content',
//     display: 'flex',
//     gap: 2,
//     },
// });
