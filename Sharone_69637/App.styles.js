import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    display: 'flex',
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    padding: 8,
    width: 325,
    gap: 8,
  },
  avatar: {
    width: 75,
    height: 75,  // Perbaikan typo
    borderRadius: 999,
  },
  boldText: {
    fontWeight: 'bold',
  },
  description: {
    width: 'fit-content',
    display: 'flex',
    gap: 2,
  },
});

export default styles;