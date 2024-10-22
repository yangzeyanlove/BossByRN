import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SizeBox from '../size-box';

interface IHeaderWrapProps {
  children: React.ReactNode;
  endY?: number;
  endColor?: string;
}
const HeaderWrap: React.FC<IHeaderWrapProps> = ({
  children,
  endY = 0.5,
  endColor = 'white',
}) => {
  return (
    <LinearGradient
      colors={['#6AD9D8', '#ACEAEA', endColor]}
      start={{x: 0.5, y: 0}} // 渐变起点
      end={{x: 0.5, y: endY}} // 渐变终点
      locations={[0, 0.5, 1]} // 每种颜色对应的百分比位置
    >
      <SizeBox height={StatusBar.currentHeight} />
      <SafeAreaView>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default HeaderWrap;
