import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/pages/TabNavigator';

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
