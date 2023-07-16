import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Text,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../slices';
import {addItem, Item, removeItem, updateItem} from '../slices/shoppinglist';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function ShoppingList() {
  const [itemName, setItemName] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [editingItem, setEditingItem] = useState(0);
  const [editedName, setEditedName] = useState('');
  const [editedBrand, setEditedBrand] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [editedDate, setEditedDate] = useState(new Date());
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.shoppinglist.items);
  const brands = ['Adidas', 'Puma', 'Nike', 'Asics'];

  const handleAddItem = () => {
    if (itemName.trim() !== '' && selectedBrand.trim() !== '') {
      const newItem: Item = {
        id: items.length + 1,
        name: itemName,
        brand: selectedBrand,
        createdAt: new Date(),
      };
      dispatch(addItem(newItem));
      setItemName('');
      setSelectedBrand('');
    } else {
      ToastAndroid.show('상품을 입력해주세요', ToastAndroid.SHORT);
    }
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const handleEditItem = () => {
    const updatedItem: Item = {
      id: editingItem,
      name: editedName,
      brand: editedBrand,
      createdAt: editedDate,
    };
    dispatch(updateItem(updatedItem));
    setEditingItem(0);
    setEditedName('');
    setEditedBrand('');
    closeModal();
  };

  const openModal = (
    itemId: number,
    name: string,
    brand: string,
    createdAt: Date,
  ) => {
    setEditingItem(itemId);
    setEditedName(name);
    setEditedBrand(brand);
    setEditedDate(createdAt);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirmDate = (date: Date) => {
    setEditedDate(date);
    hideDatePicker();
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputblock}>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder="상품 이름"
          />
          <Picker
            style={styles.picker}
            selectedValue={selectedBrand}
            onValueChange={itemValue => setSelectedBrand(itemValue)}>
            <Picker.Item
              label="Select a Brand"
              value=""
              style={styles.pickerItem1}
            />
            {brands.map(brand => (
              <Picker.Item
                key={brand}
                label={brand}
                value={brand}
                style={
                  selectedBrand === brand
                    ? styles.pickerItem3
                    : styles.pickerItem2
                }
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image
              source={require('../img/example.png')}
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemBrand}>{item.brand}</Text>
              <Text style={styles.itemAT}>
                {item.createdAt instanceof Date
                  ? item.createdAt.toLocaleString()
                  : ''}
              </Text>
            </View>
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                onPress={() => handleRemoveItem(item.id)}
                style={styles.actionButton}>
                <Icon name="delete" size={24} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  openModal(item.id, item.name, item.brand, item.createdAt)
                }
                style={styles.actionButton}>
                <Icon name="edit" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.editText}>수정할 상품 이름을 입력하세요!</Text>
            <TextInput
              style={styles.editInput}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="새로운 상품 이름"
            />
            <Text style={styles.editText}>상품의 브랜드를 선택해주세요!</Text>
            <Picker
              style={styles.editPicker}
              selectedValue={editedBrand}
              onValueChange={setEditedBrand}>
              {brands.map(brand => (
                <Picker.Item key={brand} label={brand} value={brand} />
              ))}
            </Picker>
            <Text style={styles.editText}>상품의 날짜를 선택해주세요!</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={showDatePicker}>
              <Text style={styles.dateButtonText}>
                {editedDate.toLocaleString()}
              </Text>
            </TouchableOpacity>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={closeModal}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleEditItem}>
                <Text style={styles.buttonText}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={editedDate}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
function ShoppingApp() {
  return (
    <SafeAreaView style={styles.block}>
      <ShoppingList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F6F8',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
  },

  inputblock: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  input: {
    height: 40,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  addButton: {
    backgroundColor: '#494949',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  picker: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  pickerItem1: {
    fontSize: 20,
    color: '#000000',
  },
  pickerItem2: {
    fontSize: 18,
    color: 'gray',
  },
  pickerItem3: {
    fontSize: 20,
    color: 'skyblue',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  itemInfo: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  itemBrand: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemAT: {
    fontSize: 14,
    color: 'black',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  actionButton: {
    marginLeft: 8,
  },
  modalContainer: {
    alignContent: 'center',
    flex: 1,
    padding: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    margin: 10,
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editInput: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  editPicker: {
    marginBottom: 8,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  editText: {
    marginBottom: 10,
  },
  block: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#494949',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 10,
  },
  dateButtonText: {
    fontSize: 16,
  },
});

export default ShoppingApp;
