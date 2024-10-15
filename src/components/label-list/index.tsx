import React from 'react';
import {View, Text, StyleSheet, ViewStyle, StyleProp} from 'react-native';

interface ILabelListProps {
  data: string[];
  style?: StyleProp<ViewStyle>; // 可选的样式，用于自定义容器的样式
  itemStyle?: StyleProp<ViewStyle>; // 可选的样式，用于自定义容器的样式
  fontSize?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginRight?: number;
  marginBottom?: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lableItem: {
    backgroundColor: '#F5F5F5',
    color: '#5D5D5D',
    borderRadius: 4,
  },
});

const LableList: React.FC<ILabelListProps> = ({
  data,
  style,
  itemStyle,
  fontSize = 12,
  paddingHorizontal = 6,
  paddingVertical = 2,
  marginRight = 5,
  marginBottom = 10,
}) => {
  const _itemStyle = {
    fontSize,
    paddingHorizontal,
    paddingVertical,
    marginRight,
    marginBottom,
  };

  return (
    <View style={[styles.container, style]}>
      {data.map((item, index) => (
        <Text
          key={index}
          style={[styles.lableItem, itemStyle, {..._itemStyle}]}>
          {item}
        </Text>
      ))}
    </View>
  );
};

export default LableList;
