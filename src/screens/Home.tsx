import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchRecipesRequest } from '../redux/recipesSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ParamListBase,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { color } from '../utils/color';
import { routes } from '../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFont, RHeight, RWidth } from '../constants/responsiveUI';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { data, loading, error, total } = useSelector(
    (state: RootState) => state.recipes,
  );

  const limit = 50;

  useEffect(() => {
    const skip = (currentPage - 1) * limit;
    dispatch(fetchRecipesRequest({ skip, limit }));
  }, [currentPage, dispatch]);

  const loadProducts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');

      if (storedProducts) {
        try {
          setProducts(JSON.parse(storedProducts));
        } catch {
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, []),
  );

  const mergedData = [...products, ...data];

  const renderItem = ({ item }: any) => {
    const imageUri =
      Array.isArray(item?.image) && item.image.length > 0
        ? item.image[0]
        : item?.image;

    return (
      <TouchableOpacity style={styles.cardVertical}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.title}>
            {item?.name}
          </Text>
          <Text style={styles.price}>
            {item?.caloriesPerServing ?? item.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && data.length === 0) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  if (error) return <Text>{error}</Text>;

  const onEndReached = () => {
    if (!loading && data.length < total) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const footerComponent = () => {
    return loading ? <ActivityIndicator size="small" /> : null;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={mergedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        contentContainerStyle={styles.container}
        numColumns={2}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={footerComponent}
      />

      <TouchableOpacity
        style={styles.stickyButton}
        onPress={() => navigation.navigate(routes.addItem)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    gap: 20,
  },
  column: {
    gap: 10,
    marginBottom: 20,
  },
  loading: {
    paddingTop: 100,
  },
  stickyButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: color.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  cardVertical: {
    flex: 1,
    height: RWidth(150),
    width: RWidth(160),
    backgroundColor: '#FFFFFF',
    padding: RWidth(8),
    borderRadius: RWidth(12),
  },
  image: {
    height: RHeight(120),
    resizeMode: 'stretch',
    borderRadius: RWidth(12),
  },
  title: {
    fontSize: RFont(14),
    flex: 1,
  },
  price: {
    color: '#009944',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
