import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabBar, TabBarItem, TabView, TabBarProps} from 'react-native-tab-view';
import JobList from '../job/list';

// 定义路由的类型
type Route = {
  key: string;
  title: string;
};

const tabConfig = [
  {key: 'one', title: '对我感兴趣', component: JobList},
  {key: 'two', title: '看过我', component: JobList},
  {key: 'three', title: '新职位', component: JobList},
];
const tabMap = Object.fromEntries(tabConfig.map(item => [item.key, item]));

const Interaction: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabConfig);

  const renderTabBar = (props: TabBarProps<Route>) => {
    return (
      <View style={{backgroundColor: 'white'}}>
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
          indicatorStyle={{display: 'none'}}
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
      </View>
    );
  };

  const renderScene = ({route}: {route: Route}) => {
    return React.createElement(tabMap[route.key].component);
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default Interaction;
