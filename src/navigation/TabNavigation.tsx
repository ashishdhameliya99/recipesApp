import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AllTags from '../screens/AllTags';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './StackNavigation';

export type RootStackParamList = {
  Home: undefined;
  AllTags: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigation: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="AllTags" component={AllTags} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default TabNavigation;
