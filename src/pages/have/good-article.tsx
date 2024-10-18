/**
 * 好文列表
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import goodArticleListStore from '../../mobx-store/good-article-list';
import {observer} from 'mobx-react-lite';
import Icons from 'react-native-vector-icons/Ionicons';
import Row from '../../components/row';
import SizeBox from '../../components/size-box';
import {IGoodArticleItem} from './types';
import FoldText from '../../components/fold-text';
import ThemeConfig from '../../config/theme';

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
  data: IGoodArticleItem;
}
const Item: React.FC<IItemProps> = ({data}) => {
  const postUserInfo = data.postUserInfo;
  const coverImg = data.coverImg;

  return (
    <View style={styles.item}>
      {/* 发布者信息 */}
      <Row between style={{alignItems: 'flex-start'}}>
        <Row>
          <Image
            source={{uri: postUserInfo.avatar}}
            style={{width: 32, height: 32, borderRadius: 25}}
          />
          <SizeBox width={7} />
          <View>
            <Text>{postUserInfo.nickname}</Text>
            {postUserInfo.subTitle ? (
              <Text style={{fontSize: 12, color: '#888888'}}>
                {postUserInfo.subTitle}
              </Text>
            ) : null}
          </View>
        </Row>
        <Icons name="ellipsis-horizontal" size={16} color="#888888" />
      </Row>
      <SizeBox height={10} />
      {/* 标题展示 */}
      <Text style={{fontSize: 16, fontWeight: '500'}}>{data.title}</Text>
      {/* 发布内容 */}
      <SizeBox height={8} />
      <Row between style={{alignItems: 'flex-start'}}>
        <View style={{flex: 1}}>
          <FoldText
            style={{fontSize: 15, color: '#454545', lineHeight: 24}}
            text={data.content}
            numberOfLines={3}
            btnColor={ThemeConfig.PrimaryColor}
          />
        </View>
        <SizeBox width={8} />
        <Image
          source={{uri: coverImg.thumbnailUrl}}
          style={{width: 100, height: 70, borderRadius: 10}}
        />
      </Row>
      <SizeBox height={10} />
      <Row>
        <Row center flexNum={1}>
          <Icons name="chatbox-outline" size={16} color="#888888" />
          <SizeBox width={3} />
          <Text style={{color: '#888888', fontSize: 13}}>
            {data.commentCount}
          </Text>
        </Row>
        <Row center flexNum={1}>
          <Icons name="star-outline" size={16} color="#888888" />
          <SizeBox width={3} />
          <Text style={{color: '#888888', fontSize: 13}}>
            {data.collectCount}
          </Text>
        </Row>
        <Row center flexNum={1}>
          <Icons name="heart-outline" size={16} color="#888888" />
          <SizeBox width={3} />
          <Text style={{color: '#888888', fontSize: 13}}>{data.likeCount}</Text>
        </Row>
      </Row>
    </View>
  );
};

const GoodArticle: React.FC = observer(() => {
  React.useEffect(() => {
    goodArticleListStore.fetchData();
  }, []);

  return goodArticleListStore.loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <FlatList
      keyExtractor={() => Math.random().toString(36)}
      data={goodArticleListStore.list}
      renderItem={({item}) => <Item data={item} />}
    />
  );
});

export default React.memo(GoodArticle);
