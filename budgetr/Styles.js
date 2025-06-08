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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: '#F4F4F4',
  },
  itemTextStyle: {
    padding: 8,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 2
  },
  inputTextStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8
  },
  itemRow: {
  flexDirection: 'row',
  padding: 10,
  justifyContent: 'space-between',
  backgroundColor: '#eee'
  },
});
