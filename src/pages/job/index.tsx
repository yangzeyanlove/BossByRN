import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/global';
import Header from './header';
import ThemeConfig from '../../config/theme';
import SizeBox from '../../components/size-box';
import JobItem from './job-item';

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
  listFooter: {
    padding: 20,
  },
});

const Index: React.FC = observer(() => {
  // 获取 FlatList 的引用
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const goToDetail = () => {
    navigation.push('JobDetail');
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
        renderItem={({item}) => (
          <JobItem info={item} onPressHandler={goToDetail} />
        )}
        keyExtractor={() => Math.random().toString(36)}
        onEndReached={() => jobListStore.fetchData()}
        onEndReachedThreshold={0.5} // 当距离底部还有 50% 时触发
        ListFooterComponent={
          <View style={styles.listFooter}>
            <ActivityIndicator size="large" />
          </View>
        }
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
