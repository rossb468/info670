import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
   mainList: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EAEAEA',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'left',
  },
  title: {
	  fontSize: 24,
    color: '#5E5E5C',
  },
  rowItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#F4F4F4',

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5
  },
});
