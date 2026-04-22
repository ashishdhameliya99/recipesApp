import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};
export default function Graph() {
  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Bezier Line Chart</Text>

        <BarChart
          style={styles.graphStyle}
          data={data}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  graphStyle: {
    paddingRight: 64,
    paddingTop: 10,
    borderRadius: 16,
    marginVertical: 8,
  },
});
