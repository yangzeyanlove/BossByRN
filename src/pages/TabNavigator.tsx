import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';
import themeConfig from '../config/theme';
// 底部导航页面
import JobIndex from '../pages/job/index';
import HaveIndex from '../pages/have/index';
import MessageIndex from '../pages/message/index';
import MyIndex from '../pages/my/index';

// 创建Tab Navigator
const Tab = createBottomTabNavigator();

// 创建底部导航的屏幕选项函数
const getTabScreenOptions = (name: string, iconName: string) => ({
  tabBarLabel: name,
  tabBarIcon: ({color, size}: {color: string; size: number}) => (
    <Icons name={iconName} color={color} size={size} />
  ),
});

function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          marginTop: -4,
          marginBottom: 4,
        },
        tabBarInactiveTintColor: '#B8B8B8', // 未选中时的颜色
        tabBarActiveTintColor: themeConfig.PrimaryColor, // 选中时的颜色
      }}>
      <Tab.Screen
        name="职位"
        component={JobIndex}
        options={getTabScreenOptions('职位', 'briefcase')}
      />
      <Tab.Screen
        name="有了"
        component={HaveIndex}
        options={getTabScreenOptions('有了', 'book')}
      />
      <Tab.Screen
        name="消息"
        component={MessageIndex}
        options={{...getTabScreenOptions('消息', 'chatbox'), tabBarBadge: 3}}
      />
      <Tab.Screen
        name="我的"
        component={MyIndex}
        options={getTabScreenOptions('我的', 'person-circle')}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
