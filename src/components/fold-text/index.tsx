import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  TextLayoutEventData,
  LayoutChangeEvent,
} from 'react-native';

interface FoldTextProps {
  style?: StyleProp<TextStyle>; // 可选的样式，用于自定义容器的样式
  text: string;
  numberOfLines: number;
  btnColor: string;
}

const FoldText: React.FC<FoldTextProps> = ({
  style,
  text,
  numberOfLines,
  btnColor,
}) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  const [isFold, setIsFold] = useState<boolean>(false);
  const [textWidth, setTextWidth] = useState<number>(0);
  const [currenWidth, setCurrenWidth] = useState<number>(0);
  // 获取Text组件的宽度
  const handleLayout = (event: LayoutChangeEvent) =>
    setTextWidth(event.nativeEvent.layout.width);
  const handleTextLayout = (event: {nativeEvent: TextLayoutEventData}) => {
    const {lines: layoutLines} = event.nativeEvent;
    // 判断第三行的宽度是否足够
    if (layoutLines.length > numberOfLines) {
      setIsTruncated(true);
      setCurrenWidth(layoutLines[numberOfLines - 1].width);
    }
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Text
        style={[style]}
        onTextLayout={handleTextLayout}
        numberOfLines={isFold ? undefined : numberOfLines}>
        {text}
      </Text>
      {isTruncated ? (
        <Text
          style={[
            style,
            styles.truncatedText,
            {
              color: btnColor,
              right:
                textWidth - currenWidth - 45 > 0
                  ? textWidth - currenWidth - 45
                  : 0,
            },
          ]}
          onPress={() => setIsFold(!isFold)}>
          {isFold ? '收起' : '展开'}
        </Text>
      ) : null}
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
