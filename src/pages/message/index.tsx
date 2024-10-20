import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {TabBar, TabBarItem, TabView, TabBarProps} from 'react-native-tab-view';
import Chat from './chat';
import Interaction from './interaction';
import HeaderWrap from '../../components/header-wrap';
import Row from '../../components/row';
import Icons from 'react-native-vector-icons/Ionicons';
import SizeBox from '../../components/size-box';

// 定义路由的类型
type Route = {
  key: string;
  title: string;
};

const tabConfig = [
  {key: 'one', title: '聊天', component: Chat},
  {key: 'two', title: '互动', component: Interaction},
];
const tabMap = Object.fromEntries(tabConfig.map(item => [item.key, item]));

const renderTabBar = (props: TabBarProps<Route>) => {
  return (
    <HeaderWrap endY={0.8}>
      <View style={{position: 'relative'}}>
        <TabBar
          {...props}
          style={{
            backgroundColor: 'transparent',
            // backgroundColor: 'red',
            shadowOpacity: 0,
            paddingLeft: 10,
          }}
          // scrollEnabled={true} // 启用横向滚动
          indicatorStyle={{display: 'none'}} // 隐藏指示器
          tabStyle={{width: 'auto'}} // 每个 Tab 根据内容宽度自适应
          renderTabBarItem={itemProps => (
            <TabBarItem
              {...itemProps}
              key={itemProps.route.key}
              // style={{paddingTop: 0, marginTop: 0}}
            />
          )}
          renderLabel={({route, focused}) => (
            <Text
              style={{
                // backgroundColor: 'grey',
                fontSize: focused ? 24 : 18,
                color: focused ? '#000' : '#606060',
                fontWeight: focused ? '500' : '400',
                width: 50,
                lineHeight: 28,
              }}>
              {route.title}
            </Text>
          )}
        />
        <Row style={{position: 'absolute', right: 20, top: 10}}>
          <Icons name="notifications-outline" size={22} />
          <SizeBox width={20} />
          <Icons name="settings-outline" size={22} />
        </Row>
      </View>
    </HeaderWrap>
  );
};

const Index: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabConfig);

  const renderScene = ({route}: {route: Route}) => {
    return React.createElement(tabMap[route.key].component);
  };

  return (
    <TabView
      // lazy={true} // Enable lazy loading of tabs
      navigationState={{index, routes}}
      renderTabBar={renderTabBar}
      // renderScene={SceneMap(map)}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default Index;
