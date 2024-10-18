import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Row from '../../components/row';
import SizeBox from '../../components/size-box';

import {IWaitAnswerItem} from './types';
import {observer} from 'mobx-react-lite';
import waitAnswerStore from '../../mobx-store/wait-answer';
import Divider from '../../components/divider';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginTop: 12,
    marginHorizontal: 8,
    borderRadius: 5,
  },
});

interface IItemProps {
  data: IWaitAnswerItem;
}
const Item: React.FC<IItemProps> = ({data}) => {
  const answerList = data.answerList;

  return (
    <View style={styles.item}>
      <Text style={{fontSize: 15}}>{data.question}</Text>
      <Divider marginVertical={12} />

      <Row between>
        <Row>
          {answerList.map(item => [
            <Image
              key={item}
              source={{uri: item}}
              style={{width: 20, height: 20, borderRadius: 25}}
            />,
            <SizeBox key={item + 'box'} width={4} />,
          ])}
          <Text style={{fontSize: 12, color: '#888'}}>
            等{data.answerCount}人参与讨论
          </Text>
        </Row>
        <Row>
          <Text style={{fontSize: 12, color: '#888'}}>
            {data.viewCount} 浏览
          </Text>
          <SizeBox width={8} />
          <Icons name="ellipsis-horizontal" size={16} color="#888888" />
        </Row>
      </Row>
    </View>
  );
};

const WaitAnswer: React.FC = observer(() => {
  React.useEffect(() => {
    waitAnswerStore.fetchData();
  }, []);

  return waitAnswerStore.loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <FlatList
      keyExtractor={() => Math.random().toString(36)}
      data={waitAnswerStore.list}
      renderItem={({item}) => <Item data={item} />}
    />
  );
});

export default React.memo(WaitAnswer);
