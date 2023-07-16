import React, {useState} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const [numColumns, setNumColumns] = useState(2);
  const navigation = useNavigation();
  const items = useSelector(state => state.shoppinglist.items);

  const handleButtonPress = () => {
    navigation.navigate('Admin');
  };

  const renderProduct = ({item}) => (
    <View
      style={[
        styles.itemContainer,
        numColumns === 2 ? styles.itemContainerThreeColumns : null,
      ]}>
      {numColumns === 2 ? (
        <>
          <Image
            source={require('../img/example.png')}
            style={styles.itemImageThreeColumns}
          />
          <Text style={styles.itemNameThreeColumns}>{item.name}</Text>
          <Text style={styles.itemBrandThreeColumns}>{item.brand}</Text>
        </>
      ) : (
        <>
          <Image
            source={require('../img/example.png')}
            style={styles.itemImage}
          />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemBrand}>{item.brand}</Text>
        </>
      )}
    </View>
  );

  const toggleColumns = () => {
    setNumColumns(prevColumns => (prevColumns === 2 ? 1 : 2));
  };

  const handleSellAllPress = () => {
    navigation.navigate('Product');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={toggleColumns}
        activeOpacity={0.7}>
        <Icon
          name={numColumns === 2 ? 'toggle-on' : 'toggle-off'}
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>
      <View style={[styles.newCollectionContainer]}>
        <View style={styles.textContainer}>
          <Text style={styles.newCollectionTitle}>New Collection</Text>
          <Text style={styles.text}>Discount 50% for</Text>
          <Text style={styles.text}>the first transaction</Text>
          <Text style={styles.text2}>shop now</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../img/example2.png')}
            style={styles.newCollectionImage}
          />
        </View>
      </View>
      <View style={styles.brandContainer}>
        <Text style={styles.brandText}>Brand</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../img/te1.png')}
            style={styles.newCollectionImage2}
          />
          <Image
            source={require('../img/te2.png')}
            style={styles.newCollectionImage2}
          />
          <Image
            source={require('../img/te3.png')}
            style={styles.newCollectionImage2}
          />
        </View>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.brandText2}>New Arrival</Text>
        <TouchableOpacity
          style={styles.sellAllButton}
          onPress={handleSellAllPress}>
          <Text style={styles.sellAllButtonText}>Sell All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        key={numColumns.toString()}
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProduct}
        numColumns={numColumns}
        contentContainerStyle={styles.productsContainer}
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Icon name="admin-panel-settings" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F6F8',
  },

  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  itemContainerThreeColumns: {
    margin: 5,
    flexBasis: '45%',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemBrand: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemImageThreeColumns: {
    width: 100,
    height: 100,
  },
  itemNameThreeColumns: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 4,
    color: 'black',
  },
  itemBrandThreeColumns: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 4,
  },

  touchable: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A4A4A',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  newCollectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#616161',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 30,
  },
  newCollectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#aaaaaa',
  },
  text2: {
    fontSize: 20,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: '600',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  newCollectionImage2: {
    width: 90,
    height: 90,
    marginBottom: 8,
    margin: 10,
    borderRadius: 200,
    borderColor: 'gray',
    borderWidth: 2,
  },

  brandContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  brandText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  brandText2: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginBottom: 20,
    marginLeft: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sellAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#4A4A4A',
    marginBottom: 10,
  },
  sellAllButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  productsContainer: {
    paddingBottom: 70,
  },
  button: {
    position: 'absolute',
    bottom: 70,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A4A4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
