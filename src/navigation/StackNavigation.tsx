import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AllTags from '../screens/AllTags';
import AddItem from '../screens/AddItem';

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Details" component={AllTags} />
      <Stack.Screen name="AddItem" component={AddItem} />
    </Stack.Navigator>
  );
};
export default HomeStack;
