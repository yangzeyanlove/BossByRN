import React from 'react';
import {
  Text,
  // View,
  FlatList,
} from 'react-native';
// import type {PropsWithChildren} from 'react';

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

const Item = ({title}: {title: string}) => <Text>{title}</Text>;

function Index(): React.JSX.Element {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item title={item.title} />}
      keyExtractor={() => Math.random().toString(36)}
    />
  );
}

export default Index;
