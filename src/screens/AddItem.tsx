/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addRecipes } from '../API/RecipesApi';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from '../utils/color';
import { string } from '../constants/string';
import { routes } from '../constants/routes';

const AddItemScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string[] | null>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleAddProduct = async () => {
    try {
      const payload = {
        id: Date.now().toString(),
        name: name,
        price: Number(price),
        image: image,
      };
      const existingData = await AsyncStorage.getItem('products');
      const products = existingData ? JSON.parse(existingData) : [];
      products.push(payload);
      await AsyncStorage.setItem('products', JSON.stringify(products));

      const data = await addRecipes({
        ...payload,
        image:
          payload.image && payload.image.length > 0 ? payload.image[0] : null,
      });
      console.log('Success:', data);
      Alert.alert(
        'Success',
        `Added: ${data.name}`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'not add product');
    }
  };
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 5,
    });

    if (!result.didCancel && result.assets) {
      const uris = result.assets
        .map(asset => asset.uri)
        .filter((uri): uri is string => !!uri);
      setImage(uris);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label} onPress={() => navigation.goBack()}>
        {string.addItem.back}
      </Text>
      <Text onPress={() => navigation.navigate(routes.users)}>User Data</Text>
      <Text onPress={() => navigation.navigate(routes.carts)}>Carts Data</Text>
      <Text style={[styles.label, { textAlign: 'center' }]}>
        {string.addItem.title}
      </Text>
      <Text style={styles.label}>{string.addItem.addName}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={string.addItem.enterName}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder={string.addItem.enterPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>{string.addItem.selectImage}</Text>
      </TouchableOpacity>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {image?.map((uri, index) => (
          <Image
            key={index}
            source={{ uri: String(uri) }}
            style={styles.preview}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleAddProduct}
        style={[styles.button, { backgroundColor: color.red, marginTop: 20 }]}
      >
        <Text style={styles.buttonText}>{string.addItem.addProduct}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: color.blue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddItemScreen;
