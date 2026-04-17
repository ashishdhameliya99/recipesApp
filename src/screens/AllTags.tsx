/* eslint-disable react-native/no-inline-styles */
import React, { useState, useMemo, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { RecipesType } from '../utils/globalType';
import { fetchTagsRequest } from '../redux/recipesSlice';

export default function AllTags() {
  const [selectedTag, setSelectedTag] = useState('View All');
  const dispatch = useDispatch();

  const { data, loading, error, tags, tagsLoading } = useSelector(
    (state: RootState) => state.recipes,
    shallowEqual,
  );
  useEffect(() => {
    dispatch(fetchTagsRequest());
  }, [dispatch]);

  const tagFilter = useMemo(() => {
    return ['View All', ...(tags ?? [])];
  }, [tags]);

  const filteredProducts = useMemo(() => {
    if (selectedTag === 'View All') return data;
    return data.filter(item => item.tags?.includes(selectedTag));
  }, [selectedTag, data]);

  if ((loading && data?.length === 0) || tagsLoading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  if (error) return <Text>{error}</Text>;

  const renderItem = ({ item }: { item: RecipesType }) => {
    return <ProductCard item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerFlatList}>
        <FlatList
          data={tagFilter}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            const isActive = selectedTag === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedTag(item)}
                style={[
                  styles.tagButton,
                  { backgroundColor: isActive ? 'green' : '#E0E0E0' },
                ]}
              >
                <Text style={{ color: isActive ? 'white' : 'black' }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.textNotFound}>No products found.</Text>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gap}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFlatList: {
    height: 60,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  tagButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
  },
  textNotFound: {
    textAlign: 'center',
  },
  gap: { gap: 10, paddingHorizontal: 20 },
});
