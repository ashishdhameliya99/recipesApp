import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AllTags from '../screens/AllTags';
import AddItem from '../screens/AddItem';
import Users from '../screens/users';
import Carts from '../screens/Carts';
import VideoDownloader from '../screens/Video';
import Graph from '../screens/PieChart';
import Line from '../screens/LineChart';
import Progress from '../screens/ProgressBar';
import BarChart from '../screens/BarChart';

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Details" component={AllTags} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Carts" component={Carts} />
      <Stack.Screen name="Graph" component={Graph} />
      <Stack.Screen name="Video" component={VideoDownloader} />
      <Stack.Screen name="Line" component={Line} />
      <Stack.Screen name="Progress" component={Progress} />
      <Stack.Screen name="BarChart" component={BarChart} />
    </Stack.Navigator>
  );
};
export default HomeStack;
