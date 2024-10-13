import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  // SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/global';
import Header from './header';
import ThemeConfig from '../../config/theme';
import SizeBox from '../../components/size-box';

import {observer} from 'mobx-react-lite';
import jobListStore from '../../mobx-store/job-list';

// const data = Array.from({length: 100}, (_, index) => ({
//   id: index + 1, // 生成从1开始的唯一ID
//   title: `Title ${index + 1}`,
// }));

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
    padding: 12,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // 如果子元素有垂直方向上的差异，可以居中它们
  },
  jobName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: '500',
  },
  salaryDesc: {
    flexShrink: 1,
    color: ThemeConfig.PrimaryColor,
    fontSize: 16,
    fontWeight: '500',
  },
  company: {
    color: '#5D5D5D',
  },
  labelList: {
    flexDirection: 'row',
  },
  lableItem: {
    backgroundColor: '#F5F5F5',
    color: '#5D5D5D',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 5,
    fontSize: 12,
  },
  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bossInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 15,
    marginRight: 5,
  },
  bossName: {
    fontSize: 12,
    // color: '#FFA500',
  },
  active: {
    fontSize: 12,
    color: '#868686',
  },
  address: {
    fontSize: 12,
    color: '#868686',
  },
});

const ItemInfo = ({info}: {info: any}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const goToDetail = () => {
    navigation.push('JobDetail');
  };

  return (
    <TouchableOpacity style={styles.item} onPress={goToDetail}>
      <View style={styles.itemTop}>
        <Text style={styles.jobName}>{info.jobName}</Text>
        <Text style={styles.salaryDesc}>{info.salaryDesc}</Text>
      </View>
      <SizeBox height={10} />
      <View>
        <Text style={styles.company}>
          {info.brandName +
            '  ' +
            info.brandStageName +
            '  ' +
            info.brandScaleName}
        </Text>
      </View>
      <SizeBox height={10} />
      <View style={styles.labelList}>
        {[...info.jobLabels, ...info.skills]
          .slice(0, 3)
          .map((label: string, index: number) => (
            <Text style={styles.lableItem} key={index}>
              {label}
            </Text>
          ))}
      </View>
      <SizeBox height={10} />
      <View style={styles.infoBottom}>
        <View style={styles.bossInfo}>
          <Image
            style={styles.avatar}
            source={{
              uri: info.bossAvatar,
            }}
          />
          <SizeBox width={5} />
          <View>
            <Text style={styles.bossName}>
              {info.bossName + '·' + info.bossTitle}
            </Text>
            <Text style={styles.active}>今日活跃</Text>
          </View>
        </View>
        <Text style={styles.address}>
          {info.areaDistrict + ' ' + info.businessDistrict}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Index: React.FC = observer(() => {
  // 获取 FlatList 的引用
  const flatListRef = useRef<FlatList>(null);

  const getFooter = () => {
    // return loading ? (
    //   <View style={{padding: 20}}>
    //     <ActivityIndicator size="large" />
    //   </View>
    // ) : null;
    return (
      <View style={{padding: 20}}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  // 下拉刷新处理函数
  const handleRefresh = () => {
    // 让 FlatList 滚动回到顶部
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
    // 刷新动画
    jobListStore.fetchData(true); // 传递 true 表示是下拉刷新
  };

  useEffect(() => {
    console.log('useEffect fetching data...');
    jobListStore.fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header onFilterChange={handleRefresh} />
      <FlatList
        ref={flatListRef} // 绑定 flatListRef 用于控制滚动
        data={jobListStore.list}
        renderItem={({item}) => <ItemInfo info={item} />}
        keyExtractor={() => Math.random().toString(36)}
        onEndReached={() => jobListStore.fetchData()}
        onEndReachedThreshold={0.5} // 当距离底部还有 50% 时触发
        ListFooterComponent={getFooter}
        refreshControl={
          <RefreshControl
            refreshing={jobListStore.refreshing}
            onRefresh={handleRefresh} // 下拉刷新回调
            colors={[ThemeConfig.PrimaryColor]} // 刷新时的指示器颜色
          />
        }
      />
      <SizeBox height={10} />
    </View>
  );
});

export default Index;
