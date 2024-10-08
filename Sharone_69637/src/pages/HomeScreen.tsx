import styles from "../../App.styles";
import { View, Text, Button } from 'react-native';
import UserList from "./UserList";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <UserList navigation={navigation} />
            <Button title="Email" onPress={() => navigation.navigate("Email")} />
        </View>
    );
};

export default HomeScreen;
