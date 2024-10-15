import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';

interface RowProps {
  children: React.ReactNode; // 子元素，可以是任意的 React 组件
  style?: StyleProp<ViewStyle>; // 可选的样式，用于自定义容器的样式
  // itemStyle?: StyleProp<ViewStyle>; // 可选的样式，用于自定义容器的样式
  // spacing?: number; // 子元素之间的间距
  between?: boolean; // 是否使用 justify-between 布局
}

const Row: React.FC<RowProps> = ({
  children,
  style,
  // itemStyle,
  // spacing = 0,
  between = false,
}) => {
  let _style = {};
  // 为每个子元素添加边距，并过滤掉 null 或 undefined 的元素
  // const renderedChildren = React.Children.map(children, (child, index) => {
  //   if (child === null || child === undefined) {
  //     return null;
  //   }

  //   const childStyle: StyleProp<ViewStyle> = {
  //     marginRight: index === React.Children.count(children) - 1 ? 0 : spacing,
  //   };

  //   return <View style={[itemStyle, childStyle]}>{child}</View>;
  // });

  if (between) {
    _style = {justifyContent: 'space-between'};
  }

  return <View style={[styles.container, style, {..._style}]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 横向排列
    alignItems: 'center', // 子元素垂直居中
  },
});

export default Row;
