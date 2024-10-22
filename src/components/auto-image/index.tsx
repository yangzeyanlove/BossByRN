import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface AutoImageProps {
  source: {uri?: string; require?: any}; // 支持本地和网络图片
  style?: object; // 可选样式
}

const AutoImage: React.FC<AutoImageProps> = ({source, style}) => {
  const [imageWidth, setImageWidth] = React.useState(0);
  const [imageHeight, setImageHeight] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);

  React.useEffect(() => {
    if (source.uri) {
      Image.getSize(
        source.uri,
        (width, height) => {
          setImageWidth(width);
          setImageHeight(height);
        },
        error => {
          console.error('Error getting image size:', error);
        },
      );
    } else if (typeof source === 'number') {
      const {width, height} = Image.resolveAssetSource(source);
      setImageWidth(width);
      setImageHeight(height);
    }
  }, [source]);

  const aspectRatio = imageWidth / imageHeight;

  const handleLayout = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const height = containerWidth / aspectRatio;

  return (
    <View style={[styles.container, style]} onLayout={handleLayout}>
      {containerWidth > 0 && (
        <Image
          source={source}
          style={{width: containerWidth, height}}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default AutoImage;
