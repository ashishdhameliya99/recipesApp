import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { localRecipesType } from '../utils/globalType';
import { RFont, RHeight, RWidth } from '../constants/responsiveUI';
import { fetchUsers } from '../redux/thunk/thunkAction';

const Users = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector((state: RootState) => {
    return state?.apiReducer;
  });
  console.log('user page data=======', users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading && users?.length === 0) {
    return <ActivityIndicator size="large" />;
  }

  if (error) return <Text>{error}</Text>;
  const renderItemLocal = ({ item }: { item: localRecipesType }) => {
    return (
      <TouchableOpacity style={styles.cardVertical}>
        <Image source={{ uri: item?.image }} style={styles.image} />
        <View style={styles.titleRow}>
          <Text style={[styles.title]} ellipsizeMode="tail" numberOfLines={1}>
            {item?.firstName}
          </Text>
          <Text style={styles.price}>{item?.lastName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.goBack()}>Back</Text>
      <FlatList
        data={users}
        renderItem={renderItemLocal}
        contentContainerStyle={styles.container}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardVertical: {
    flex: 1,
    height: RWidth(150),
    width: RWidth(160),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: RWidth(8),
    paddingVertical: RWidth(8),
    borderRadius: RWidth(12),
  },
  container: {
    marginHorizontal: 25,
    gap: 20,
  },
  column: {
    gap: 10,
    marginBottom: 20,
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
  icon: {
    height: RHeight(20),
    width: RWidth(20),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Users;
