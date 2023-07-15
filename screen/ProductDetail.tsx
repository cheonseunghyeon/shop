import React from 'react';
import {View, Text} from 'react-native';

function ProductDetail({route}) {
  const {item} = route.params;

  return (
    <View>
      <Text>Product Name: {item.name}</Text>
      <Text>Brand: {item.brand}</Text>
      <Text>Created At: {item.createdAt.toLocaleString()}</Text>
    </View>
  );
}

export default ProductDetail;
