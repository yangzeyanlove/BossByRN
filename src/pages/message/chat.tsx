import React from 'react';
import {Text, View, useWindowDimensions, StyleSheet} from 'react-native';
import {TabBar, TabBarItem, TabView, TabBarProps} from 'react-native-tab-view';
import {NestedScrollView, NestedScrollViewHeader} from '@sdcx/nested-scroll';
import Row from '../../components/row';
import Icons from 'react-native-vector-icons/Ionicons';
import SizeBox from '../../components/size-box';
import ThemeConfig from '../../config/theme';
import ChatList from './chat-list';
import chatStore from '../../mobx-store/chat';

// 定义路由的类型
type Route = {
  key: string;
  title: string;
};

const tabConfig = [
  {key: 'one', title: '全部', component: ChatList},
  {key: 'two', title: '新招呼', component: ChatList},
  {key: 'three', title: '仅沟通', component: ChatList},
  {key: 'four', title: '有交流', component: ChatList},
];
const tabMap = Object.fromEntries(tabConfig.map(item => [item.key, item]));

const styles = StyleSheet.create({
  top: {
    paddingHorizontal: 18,
    paddingTop: 4,
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

const Chat: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabConfig);

  const renderTabBar = (props: TabBarProps<Route>) => {
    return (
      <TabBar
        {...props}
        style={{
          // backgroundColor: 'grey',
          backgroundColor: 'white',
          // height: 40,
          marginLeft: 8,
          shadowColor: 'rgba(0,0,0,0)',
        }}
        scrollEnabled={true} // 启用横向滚动
        indicatorStyle={{
          backgroundColor: ThemeConfig.PrimaryColor,
          height: 4,
          marginBottom: 9,
          width: 0.5,
          borderRadius: 4,
        }}
        tabStyle={{width: 'auto'}} // 每个 Tab 根据内容宽度自适应
        renderTabBarItem={itemProps => (
          <TabBarItem
            {...itemProps}
            key={itemProps.route.key}
            style={{
              // padding: 0,
              marginTop: -4,
            }}
          />
        )}
        renderLabel={({route, focused}) => (
          <Text
            style={{
              fontSize: 14,
              color: focused ? '#000' : '#606060',
              fontWeight: focused ? '500' : '400',
            }}>
            {route.title}
          </Text>
        )}
      />
    );
  };

  const renderScene = ({route}: {route: Route}) => {
    return React.createElement(tabMap[route.key].component, {
      dataType: route.key,
    });
  };

  React.useEffect(() => {
    chatStore.changeTab(index, tabConfig[index].key);
  }, []);

  return (
    <NestedScrollView style={{backgroundColor: 'white'}}>
      <NestedScrollViewHeader>
        <View style={styles.top}>
          <Row style={styles.searchBar}>
            <Icons name="search" color="#888" size={16} />
            <SizeBox width={6} />
            <Text style={{color: '#999'}}>搜索联系人、公司、聊天记录</Text>
          </Row>
        </View>
      </NestedScrollViewHeader>

      <TabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={id => {
          setIndex(id);
          chatStore.changeTab(id, tabConfig[id].key);
        }}
        initialLayout={{width: layout.width}}
      />
    </NestedScrollView>
  );
};

export default Chat;
