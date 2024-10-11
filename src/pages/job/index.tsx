import React from 'react';
import {
  // Text,
  // View,
  Button,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/global';

const data = [
  {id: '1', title: 'Item 1'},
  {id: '2', title: 'Item 2'},
  {id: '3', title: 'Item 3'},
  {id: '4', title: 'Item 3'},
  {id: '5', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
  {id: '3', title: 'Item 3'},
];

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

function Index(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // const handlePress = () => {
  //   // navigation.push('JobDetail');
  //   navigation.navigate('JobDetail');
  // };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        // <Text onPress={() => handlePress}>{item.title}</Text>
        <Button
          title={item.title}
          onPress={() => navigation.navigate('JobDetail')}
        />
      )}
      keyExtractor={() => Math.random().toString(36)}
    />
  );
}

export default Index;
