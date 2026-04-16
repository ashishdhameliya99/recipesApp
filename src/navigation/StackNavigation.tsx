import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AllTags from '../screens/AllTags';
import AddItem from '../screens/AddItem';
import Users from '../screens/users';
import Carts from '../screens/Carts';

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Details" component={AllTags} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Carts" component={Carts} />
    </Stack.Navigator>
  );
};
export default HomeStack;
