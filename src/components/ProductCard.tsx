import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RFont, RHeight, RWidth } from '../constants/responsiveUI';
import { memo } from 'react';
import { ProductCardProps } from '../utils/globalType';

const ProductCard: React.FC<ProductCardProps> = ({ item }: any) => {
  return (
    <TouchableOpacity style={styles.cardVertical}>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <View style={styles.titleRow}>
        <Text style={[styles.title]} ellipsizeMode="tail" numberOfLines={1}>
          {item?.name}
        </Text>
        <Text style={styles.price}>{item?.caloriesPerServing}</Text>
      </View>
    </TouchableOpacity>
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

export default memo(ProductCard);
