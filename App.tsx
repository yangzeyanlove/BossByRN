import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/pages/TabNavigator';
// 独立页面
import JobDetail from './src/pages/job/detai';
import {RootStackParamList} from './src/types/global';

// 创建导航堆栈
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content" // enum('default', 'light-content', 'dark-content')
        translucent={true} // 应用会延伸到状态栏之下绘制
        backgroundColor="transparent"
      />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'left',
        }}>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobDetail"
          component={JobDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
