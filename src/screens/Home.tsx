import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootState } from '../redux/store';
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
import { ActionItem } from '../utils/globalType';
import { useAppDispatch } from '../utils/reduxUtil';

export default function Home() {
  const [products, setProducts] = useState<ActionItem[]>([]);
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const limit = 10;
  const { data, loading, error } = useSelector(
    (state: RootState) => state.recipes,
  );

  useEffect(() => {
    dispatch(fetchRecipesRequest({ limit: limit, skip: 0 }));
  }, [dispatch]);

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
  const renderItem: ListRenderItem<ActionItem> = ({ item }) => {
    return (
      <TouchableOpacity style={styles.cardVertical}>
        <Image source={{ uri: item.image }} style={styles.image} />
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

  const loadMore = () => {
    if (loading) return;

    const nextPage = page + 1;
    setPage(nextPage);

    const skip = (nextPage - 1) * limit;

    dispatch(fetchRecipesRequest({ limit: limit, skip: skip }));
  };
  const footerComponent = () => {
    return loading ? <ActivityIndicator size="small" /> : null;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={mergedData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        numColumns={2}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
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
  mainContainer: { flex: 1 },
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
