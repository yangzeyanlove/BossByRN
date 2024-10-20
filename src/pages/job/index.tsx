import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './header';
import SizeBox from '../../components/size-box';
import JobList, {IJobListRef} from './list';

import {observer} from 'mobx-react-lite';
import jobListStore from '../../mobx-store/job-list';

// const data = Array.from({length: 100}, (_, index) => ({
//   id: index + 1, // 生成从1开始的唯一ID
//   title: `Title ${index + 1}`,
// }));

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
  const jobListRef = React.useRef<IJobListRef>(null);

  // 下拉刷新处理函数
  const handleRefresh = (index: number) => {
    // 触发 列表刷新
    jobListStore.changeCurrentType(index);
    jobListRef.current?.doRefresh();
  };

  return (
    <View style={styles.container}>
      <Header onFilterChange={handleRefresh} />
      <JobList ref={jobListRef} jobType={jobListStore.currentType} />
      <SizeBox height={10} />
    </View>
  );
});

export default Index;
