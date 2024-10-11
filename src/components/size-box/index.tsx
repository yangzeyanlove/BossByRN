import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

interface SizeBoxProps {
  width?: number | string; // 可选宽度
  height?: number | string; // 可选高度
  style?: StyleProp<ViewStyle>; // 可选额外样式
}

const SizeBox: React.FC<SizeBoxProps> = ({width, height, style}) => {
  const placeholderStyle = [
    styles.default,
    style,
    ...(typeof width === 'number' ? [{width}] : []),
    ...(typeof height === 'number' ? [{height}] : []),
  ];

  return <View style={placeholderStyle} />;
};

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
  },
});

export default SizeBox;
