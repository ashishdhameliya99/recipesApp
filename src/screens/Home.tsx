import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchRecipesRequest } from '../redux/recipesSlice';
import { RecipesType } from '../utils/globalType';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProductCard from '../components/ProductCard';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { color } from '../utils/color';
import { routes } from '../constants/routes';

export default function Home() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { data, loading, error, total } = useSelector(
    (state: RootState) => state.recipes,
  );
  const limit = 50;
  console.log('all data======', data[51]);
  useEffect(() => {
    const skip = (currentPage - 1) * limit;

    dispatch(fetchRecipesRequest({ skip, limit }));
  }, [currentPage, dispatch]);

  const renderItem = ({ item }: { item: RecipesType }) => {
    return <ProductCard item={item} />;
  };

  if (loading && data?.length === 0) {
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
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        numColumns={2}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
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
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
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
    backgroundColor: color.black,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: color.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
