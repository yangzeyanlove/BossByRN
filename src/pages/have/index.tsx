import * as React from 'react';
import {Text, Image, useWindowDimensions, StyleSheet} from 'react-native';
import {
  TabBar,
  TabBarItem,
  TabView,
  SceneMap,
  TabBarProps,
} from 'react-native-tab-view';
import HeaderWrap from '../../components/header-wrap';
import Icons from 'react-native-vector-icons/Ionicons';
import Row from '../../components/row';
import SizeBox from '../../components/size-box';
import TopList from './top-list';
import ThemeConfig from '../../config/theme';

const tabConfig = [
  {key: 'one', title: '精选', component: TopList},
  {key: 'two', title: '好文', component: TopList},
  {key: 'three', title: '等你来答', component: TopList},
  {key: 'four', title: '求职', component: TopList},
  {key: 'five', title: '直播', component: TopList},
  {key: 'six', title: '关注', component: TopList},
  {key: 'seven', title: '其他', component: TopList},
];

// 定义路由的类型
type Route = {
  key: string;
  title: string;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  search: {
    flex: 1,
    borderColor: '#57B6B4',
    borderWidth: 1,
    borderRadius: 50,
    height: 24,
  },
});

// 使用泛型指定路由的类型
const renderTabBar = (props: TabBarProps<Route>) => {
  return (
    <TabBar
      {...props}
      style={{backgroundColor: 'white', height: 40}}
      scrollEnabled={true} // 启用横向滚动
      indicatorStyle={{
        backgroundColor: ThemeConfig.PrimaryColor,
        height: 4,
        marginBottom: 6,
        width: 0.4,
      }}
      tabStyle={{
        width: 'auto',
      }} // 每个 Tab 根据内容宽度自适应
      renderTabBarItem={itemProps => (
        <TabBarItem
          {...itemProps}
          key={itemProps.route.key}
          style={{
            paddingBottom: 15,
            marginHorizontal: 2,
          }}
        />
      )}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            fontSize: 15,
            color: focused ? '#000' : '#606060',
            fontWeight: focused ? '500' : '400',
          }}>
          {route.title}
        </Text>
      )}
    />
  );
};

const Header: React.FC = () => {
  return (
    <HeaderWrap>
      <SizeBox height={5} />
      <Row style={styles.container}>
        <Text style={styles.title}>有了</Text>
        <SizeBox width={14} />
        <Row style={styles.search}>
          <SizeBox width={10} />
          <Icons name="search-outline" size={15} color="#BBBABA" />
          <SizeBox width={2} />
          <Text style={{color: '#BBBABA'}}>兼职</Text>
        </Row>
        <SizeBox width={18} />
        <Icons name="notifications-outline" size={20} />
        <SizeBox width={18} />
        <Image
          source={{
            uri: 'https://img.bosszhipin.com/boss/avatar/avatar_5.png',
          }}
          style={{width: 24, height: 24, borderRadius: 25}}
        />
      </Row>
    </HeaderWrap>
  );
};
const Index: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes: Route[] = [];
  const map: {[key: string]: React.FC} = {};

  tabConfig.forEach(item => {
    routes.push({key: item.key, title: item.title});
    map[item.key] = item.component;
  });

  return (
    <>
      <Header />
      <TabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={SceneMap(map)}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};

export default Index;
