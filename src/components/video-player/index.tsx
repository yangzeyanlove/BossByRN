// VideoPlayer.tsx
import React, {useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Video, {OnLoadData, OnProgressData, VideoRef} from 'react-native-video';
import ThemeConifg from '../../config/theme';

interface IVideoPlayerProps {
  uri: string;
  width?: number | '100%';
  height?: number | '100%';
}
const VideoPlayer: React.FC<IVideoPlayerProps> = ({uri}) => {
  const videoPlayerRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); // 错误状态

  const handleLoad = (data: OnLoadData) => {
    setDuration(data.duration);
    setError(false); // 加载成功时重置错误状态
  };

  const handleProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
  };

  const handleEnd = () => {
    setIsFinished(true); // 视频播放完毕
    setPaused(true); // 设置为暂停状态
    videoPlayerRef.current?.seek(0); // 直接重置到开始位置，释放内存
  };

  const handleError = () => {
    setError(true); // 发生错误时更新错误状态
  };

  const togglePlayPause = () => {
    setPaused(prev => !prev);
    setIsFinished(false); // 播放时重置为未结束状态
  };

  const handleVideoPress = () => {
    if (!isFinished) {
      togglePlayPause(); // 点击视频时切换播放状态
    } else {
      restartVideo(); // 如果视频已结束，则重新开始
    }
  };

  const restartVideo = () => {
    videoPlayerRef.current?.seek(0); // 从头开始播放
    setPaused(false); // 播放
    setIsFinished(false); // 重置状态
  };

  const renderPlayButton = () => {
    if (paused || isFinished) {
      return (
        <TouchableOpacity
          onPress={isFinished ? restartVideo : togglePlayPause}
          style={styles.playButton}>
          <Text style={styles.buttonText}>
            {isFinished ? 'Replay' : 'Play'}
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const cleanup = () => {
    setPaused(true);
    setIsFinished(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const renderErrorScreen = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>无法加载视频，请稍后重试。</Text>
      <TouchableOpacity onPress={restartVideo} style={styles.retryButton}>
        <Text style={styles.buttonText}>重试</Text>
      </TouchableOpacity>
    </View>
  );

  // 在组件卸载时清理
  React.useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  // uri: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  // uri: 'https://yanshi.tidemedia.com/2023/1/6/2023161672994186521_1156_533.mp4',

  return (
    <View style={styles.container}>
      {error ? (
        renderErrorScreen() // 显示错误界面
      ) : (
        <Video
          ref={videoPlayerRef}
          style={styles.video}
          resizeMode="contain"
          source={{uri: uri}}
          paused={paused}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onEnd={handleEnd} // 视频播放结束时调用
          onTouchEnd={handleVideoPress} // 点击视频切换播放状态
          // onBuffer={buffer => console.log(buffer)}
          onError={handleError} // 处理加载错误
        />
      )}

      {/* 中间的播放按钮 */}
      {renderPlayButton()}

      {/* 播放进度条 */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {width: `${(currentTime / duration) * 100}%`},
          ]}
        />
      </View>
    </View>
  );
};

// 样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#1c1c1e',
    transform: [{translateX: -20}, {translateY: -20}],
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#d3d3d3',
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: ThemeConifg.PrimaryColor,
  },
  errorContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingTop: '25%',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#1c1c1e',
    padding: 10,
    borderRadius: 5,
  },
});

export default VideoPlayer;
