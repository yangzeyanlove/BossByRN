import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  // Button,
  FlatList,
  // SafeAreaView,
  TouchableOpacity,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/global';
import Header from './header';

const data = Array.from({length: 100}, (_, index) => ({
  id: index + 1, // 生成从1开始的唯一ID
  title: `Title ${index + 1}`,
}));

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});

const ItemInfo = ({info}: {info: any}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Text>{info.title}</Text>
    </TouchableOpacity>
  );
};

function Index(): React.JSX.Element {
  // const navigation = useNavigation<HomeScreenNavigationProp>();

  // const handlePress = () => {
  //   // navigation.push('JobDetail');
  //   navigation.navigate('JobDetail');
  // };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        renderItem={({item}) => (
          // <Text onPress={() => handlePress}>{item.title}</Text>
          <ItemInfo info={item} />
        )}
        keyExtractor={() => Math.random().toString(36)}
      />
    </View>
  );
}

export default Index;
