import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Row from '../../components/row';
import Icons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import SizeBox from '../../components/size-box';

import {observer} from 'mobx-react-lite';
import chatStore from '../../mobx-store/chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

interface IItemProps {
  data: {
    uid: number;
    name: string;
    avatar: string;
    brandName: string;
    title: string;
    date: string;
    type: string;
    content: string;
  };
}
const Item: React.FC<IItemProps> = ({data}: any) => {
  return (
    <Row style={styles.item}>
      {data.avatar ? (
        <Image style={styles.avatar} source={{uri: data.avatar}} />
      ) : (
        <LinearGradient
          colors={
            data.isLatest ? ['#FF6347', 'orange'] : ['#008000', '#90EE90']
          } // 渐变颜色从橙色到红色
          start={{x: 0.0, y: 0.5}}
          end={{x: 1.0, y: 0.5}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icons
            name={data.isLatest ? 'add' : 'notifications-outline'}
            color={'#fff'}
            size={30}
          />
        </LinearGradient>
      )}
      <SizeBox width={14} />
      <View style={{flex: 1}}>
        <Row between>
          <Row>
            <Text style={{fontSize: 15}}>{data.name}</Text>
            <SizeBox width={4} />
            <Text style={{fontSize: 13, color: 'grey'}}>
              {data.brandName + '·' + data.title}
            </Text>
          </Row>
          <Text style={{fontSize: 12, color: '#aaa'}}>{data.date}</Text>
        </Row>
        <SizeBox height={4} />
        <Row>
          {data.type ? (
            <Text style={{color: 'grey'}}>[{data.type}] </Text>
          ) : null}
          <Text
            style={{flex: 1, color: '#666'}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {data.content}
          </Text>
        </Row>
      </View>
    </Row>
  );
};

interface IChatListProps {
  dataType: string;
}
const ChatList: React.FC<IChatListProps> = observer(({dataType}) => {
  React.useEffect(() => {
    console.log('useEffect fetching data...', dataType);
    chatStore.fetchData();
  }, [dataType]);

  return dataType && chatStore.loadedTypeArr.includes(dataType) ? (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        keyExtractor={() => Math.random().toString(36)}
        data={dataType === 'one' ? chatStore.allData : chatStore.list}
        renderItem={({item}) => <Item data={item} />}
      />
    </View>
  ) : (
    <ActivityIndicator size="large" />
  );
});

export default React.memo(ChatList);
