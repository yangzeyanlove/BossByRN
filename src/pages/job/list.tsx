import React, {forwardRef, useImperativeHandle} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../types/global';
import JobItem from './job-item';
import ThemeConfig from '../../config/theme';

import {observer} from 'mobx-react-lite';
import jobListStore from '../../mobx-store/job-list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listFooter: {
    padding: 20,
  },
});

export interface IJobListRef {
  doRefresh: () => void; // 子组件的方法类型
}

interface JobListProps {
  jobType: string | number; // 接收 jobType 属性
}

const JobList = forwardRef<IJobListRef, JobListProps>(({jobType}, ref) => {
  // 获取 FlatList 的引用
  const flatListRef = React.useRef<FlatList>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const goToDetail = (data: any) => {
    navigation.push('JobDetail', data);
  };

  // 下拉刷新处理函数
  const handleRefresh = () => {
    // 让 FlatList 滚动回到顶部
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
    // 刷新动画
    jobListStore.fetchData(true); // 传递 true 表示是下拉刷新
  };

  React.useEffect(() => {
    console.log('useEffect fetching data...');
    handleRefresh();
  }, []);

  useImperativeHandle(ref, () => ({
    doRefresh: () => {
      console.log(
        `Child method called! Job type is: ${jobType}`,
        new Date().getTime(),
      );
      // 在这里实现子组件的方法逻辑
      handleRefresh();
    },
  }));

  return (
    <FlatList
      ref={flatListRef} // 绑定 flatListRef 用于控制滚动
      data={jobListStore.list}
      renderItem={({item}) => (
        <JobItem info={item} onPressHandler={() => goToDetail(item)} />
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
  );
});

export default observer(JobList);
