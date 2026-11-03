import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  line: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginTop: 10,
  },

  Input: {
    borderWidth: 1,
    padding: 10,
  },

  item: {
    padding: 20,
    width: 250,
    borderBottomWidth: 1,
    borderColor: 'rgb(10, 10, 10)',
    backgroundColor: 'rgb(112, 112, 112)',
  },

  carImage: {
    width: 400,
    height: 240,
    resizeMode: 'cover',
    marginTop: 10,
  },

  itemPressed: {
    opacity: 0.6,
  },

  loggedInItem: {
    backgroundColor: 'gray',
  },

  loggedOutItem: {
    backgroundColor: 'gray',
  },
});

export default styles;