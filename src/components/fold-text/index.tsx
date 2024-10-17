import React, {useState} from 'react';
import {
  Text,
  View,
  TextLayoutEventData,
  LayoutChangeEvent,
  TextStyle,
} from 'react-native';

interface IFoldTextProps {
  style?: TextStyle;
  text?: string;
  numberOfLines?: number;
  btnColor: string;
}
const FoldText: React.FC<IFoldTextProps> = ({
  style,
  text,
  numberOfLines = 3,
  btnColor,
}) => {
  const [textWidth, setTextWidth] = useState<number>(0);
  const [isOverLine, setIsOverLine] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const hasCalculated = React.useRef(false); // 引入 useRef 来追踪是否已计算
  const [cutLen, setCutLen] = useState(0);
  // 插入的内容
  const [isFold, setIsFold] = useState(true);
  const insertChar = isFold ? '展开' : '收起';
  const overStr = isFold ? '...' : '';

  // 获取Text组件的宽度
  const handleLayout = (event: LayoutChangeEvent) =>
    setTextWidth(event.nativeEvent.layout.width);

  const handleTextLayout = (event: {nativeEvent: TextLayoutEventData}) => {
    if (hasCalculated.current) {
      return; // 如果已经计算过，直接返回
    }

    const {lines: layoutLines} = event.nativeEvent;
    if (!isOverLine && layoutLines.length >= numberOfLines) {
      // 获取到所有换行内容后进行处理
      const actualLines = layoutLines.map(line => line.text);

      // 判断第三行的宽度是否足够
      const currentLineWidth = layoutLines[numberOfLines - 1].width;

      // 如果第三行宽度不足，裁剪内容，省略号算一个长度
      const insertCharLength = insertChar.length + 1;
      if (currentLineWidth + insertCharLength * 8 >= textWidth) {
        // 动态裁剪第三行文本（大概估算每个字的宽度为8个单位）
        setCutLen(Math.floor((textWidth - insertCharLength * 8) / 8));
      }

      setLines(actualLines);
      setIsOverLine(true);
      hasCalculated.current = true; // 标记已计算
    }
  };

  const renderDisplayText = () => {
    const arr = isFold ? lines.slice(0, numberOfLines) : lines;
    // 根据是否需要显示省略号来决定显示内容
    return arr.map((line, index) => (
      <Text key={index}>
        {isFold && index === numberOfLines - 1
          ? line.trimEnd().slice(0, cutLen)
          : line}
      </Text>
    ));
  };

  return (
    <View onLayout={handleLayout}>
      <Text style={style} onTextLayout={handleTextLayout}>
        {isOverLine
          ? [
              renderDisplayText(),
              <Text key="slh">{overStr}</Text>,
              <Text
                key="btn"
                style={{color: btnColor}}
                onPress={() => setIsFold(!isFold)}>
                {insertChar + '\n'}
              </Text>,
            ]
          : // 先显示完整文本，等到获取布局信息
            text}
      </Text>
    </View>
  );
};

export default FoldText;
