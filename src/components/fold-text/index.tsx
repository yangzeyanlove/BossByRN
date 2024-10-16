import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import ThemeConfig from '../../config/theme';

interface FoldTextProps {
  style?: StyleProp<TextStyle>; // 可选的样式，用于自定义容器的样式
  text: string;
  numberOfLines: number;
  lineHeight?: number;
}

const FoldText: React.FC<FoldTextProps> = ({
  style,
  text,
  numberOfLines,
  lineHeight = 24,
}) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  const [isFold, setIsFold] = useState<boolean>(false);
  const _style = {lineHeight};
  const handleLayout = (event: {nativeEvent: {layout: {height: number}}}) => {
    const {height} = event.nativeEvent.layout;
    // const lineHeight = parseInt(lineHeight.toString(), 10);
    const maxHeight = lineHeight * numberOfLines;
    setIsTruncated(height > maxHeight);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[{..._style}, style]}
        onLayout={handleLayout}
        numberOfLines={isFold ? undefined : numberOfLines}>
        {text}
      </Text>

      {isTruncated && (
        <TouchableOpacity
          style={styles.truncatedText}
          onPress={() => setIsFold(!isFold)}>
          <Text style={{..._style, color: ThemeConfig.PrimaryColor}}>
            {isFold ? '收起' : '展开'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  truncatedText: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 确保背景色与文本背景相同
    paddingLeft: 10,
  },
});

export default FoldText;
