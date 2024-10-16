import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Row from '../../components/row';
import SizeBox from '../../components/size-box';
import {observer} from 'mobx-react-lite';
import haveTopListStore from '../../mobx-store/have-top-list';
import {IHaveItem} from './types';
import VideoPlayer from '../../components/video-player';
import FoldText from '../../components/fold-text';

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
  data: IHaveItem;
}
const Item: React.FC<IItemProps> = ({data}) => {
  const postUserInfo = data.postUserInfo;
  const picList = data.picList || [];
  const coverImg = data.coverImg;
  const fileInfo = data.file;

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
            <Text>{postUserInfo.bcName}</Text>
            {postUserInfo.subTitle ? (
              <Text style={{fontSize: 12, color: '#888888'}}>
                {postUserInfo.subTitle}
              </Text>
            ) : null}
          </View>
        </Row>
        <Icons name="ellipsis-horizontal" size={16} color="#888888" />
      </Row>
      {/* 发布内容 */}
      <SizeBox height={10} />
      <FoldText
        style={{fontSize: 15, color: '#454545', lineHeight: 24}}
        text={data.content}
        numberOfLines={3}
      />
      <SizeBox height={10} />
      {/* 媒体，图片/视频 */}
      {picList.length ? (
        <>
          <Image
            source={{uri: picList[0]['thumbnailUrl']}}
            style={{width: 120, height: 200, borderRadius: 10}}
          />
          <SizeBox height={10} />
        </>
      ) : null}
      {/* 视频 */}
      {coverImg != null && fileInfo != null && fileInfo.url ? (
        <View style={{width: 120, height: 200}}>
          <VideoPlayer key={data.addTime} uri={fileInfo.url} />
        </View>
      ) : null}
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

const TopList: React.FC = observer(() => {
  React.useEffect(() => {
    haveTopListStore.fetchData();
  }, []);

  return (
    <FlatList
      keyExtractor={() => Math.random().toString(36)}
      data={haveTopListStore.list}
      renderItem={({item}) => <Item data={item} />}
    />
  );
});

export default TopList;
