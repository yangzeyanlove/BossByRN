import React from 'react';
import {
  StyleSheet,
  View,
  // FlatList,
  // ActivityIndicator,
  // RefreshControl,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {HomeScreenNavigationProp} from '../../types/global';
import Header from './header';
// import ThemeConfig from '../../config/theme';
import SizeBox from '../../components/size-box';
// import JobItem from './job-item';
import JobList from './list';

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
  return (
    <View style={styles.container}>
      <Header />
      <JobList currentIndex={jobListStore.currentType} />
      <SizeBox height={10} />
    </View>
  );
});

export default Index;
