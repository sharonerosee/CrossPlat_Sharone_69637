import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

interface ICounter{
    handleIncrement: () => void;
    handleDecrement: () => void;
    handlePassValue: () => void;
    value: number;
}

const Counter = ({
    handleDecrement,
    handleIncrement,
    handlePassValue,
    value,
}: ICounter) => {
    return (
        <View style={styles.container}>
            <Text style={styles.valueText}>{value}</Text>
            <View style={styles.container}>
            <Button title="Increment" onPress={handleIncrement} />
            <Button title="Decrement" onPress={handleDecrement} />
            <Button title="PassValue" onPress={handlePassValue} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    valueText: {
        fontSize: 32,
        marginVertical: 10,
    },
    btnContainer:{
        marginVertical: 10,
        width: '50%',
    },
});

export default Counter;