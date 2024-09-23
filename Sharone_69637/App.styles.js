import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: "center",
    padding: 8,
    width: 325,
    gap: 8,
    backgroundColor: '#F4C2C2',
    marginBottom: 10,
    transition: 'transform 0.2s ease',
  },
  cardHovered: {
    transform: [{ scale: 1.05 }], 
    backgroundColor: '#CDEBC5',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 999,
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  description: {
    fontFamily: 'Poppins-Light',
  },
  headerText: {
    fontFamily: 'Poppins-Bold-Italic',
    fontSize: 24,
    marginBottom: 20,
    marginTop: 50,
    backgroundColor: '#E6E6FA',
    padding: 3,
    borderRadius: 15,
  },
  scrollView: {
    paddingBottom: 20,
  },
});

export default styles;
