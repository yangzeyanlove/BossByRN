import React from 'react';
import {
  Image,
  Text,
  View,
  // ScrollView,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import HeaderWrap from '../../components/header-wrap';
import Row from '../../components/row';
import SizeBox from '../../components/size-box';
import AutoImage from '../../components/auto-image';

// 滚动阀值
const scrollMax = 110;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  header: {},
  content: {
    paddingHorizontal: 10,
  },
  block: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  blockPadding: {
    padding: 15,
  },
  blockTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});

const Header = () => {
  return (
    <View style={styles.header}>
      <HeaderWrap endY={0.8} endColor={'#F2F2F2'}>
        <Row between style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Row style={{opacity: 0}}>
            <Image
              source={{
                uri: 'https://img.bosszhipin.com/boss/avatar/avatar_5.png',
              }}
              style={{width: 24, height: 24, borderRadius: 30}}
            />
            <SizeBox width={8} />
            <Text style={{fontSize: 16, fontWeight: '500'}}>杨先生</Text>
          </Row>
          <Row>
            <Icons name="people-outline" size={20} />
            <SizeBox width={20} />
            <Icons name="scan-outline" size={20} />
            <SizeBox width={20} />
            <Icons name="settings-outline" size={20} />
          </Row>
        </Row>
      </HeaderWrap>
    </View>
  );
};

// 个人信息
const renderMyInfo = (scrollY: Animated.Value, isPosition = false) => {
  // 根据 scrollY 值计算图片的缩放比例和移动位置
  const imageWidth = scrollY.interpolate({
    inputRange: [0, scrollMax], // 根据滚动的高度范围调整
    outputRange: [58, 24], // 初始比例为1，最终比例为0.5
    extrapolate: 'clamp', // 超出范围时保持最后一个值
  });
  const fsize = scrollY.interpolate({
    inputRange: [0, scrollMax], // 根据滚动的高度范围调整
    outputRange: [21, 16], // 初始比例为1，最终比例为0.5
    extrapolate: 'clamp', // 超出范围时保持最后一个值
  });
  const tipsHeight = scrollY.interpolate({
    inputRange: [0, scrollMax], // 根据滚动的高度范围调整
    outputRange: [20, 0], // 初始比例为1，最终比例为0.5
    extrapolate: 'clamp', // 超出范围时保持最后一个值
  });
  return (
    <Row>
      <Row style={styles.container}>
        <Animated.Image
          source={{
            uri: 'https://img.bosszhipin.com/boss/avatar/avatar_5.png',
          }}
          style={{
            width: imageWidth,
            height: imageWidth,
            borderRadius: 30,
            opacity: isPosition ? 1 : 0,
          }}
        />
        <SizeBox width={8} />
        <View>
          <Animated.Text
            style={{
              fontSize: fsize,
              fontWeight: '500',
              opacity: isPosition ? 1 : 0,
            }}>
            杨先生
          </Animated.Text>
          <Animated.View
            style={{
              opacity: isPosition ? 0 : 1,
              height: tipsHeight,
              overflow: 'hidden',
            }}>
            <SizeBox height={3} />
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 13, color: '#666'}}>
                简历评分96分，建议优化
              </Text>
              <SizeBox width={2} />
              <Icons name="timer-outline" size={16} color="#666" />
            </View>
          </Animated.View>
        </View>
      </Row>
      <Icons
        style={{opacity: isPosition ? 0 : 1}}
        name="chevron-forward"
        size={20}
        color="#B9B9B9"
      />
    </Row>
  );
};

// 渲染顶部统计数据
const renderTotalData = () => {
  const totalData = [
    {
      label: '沟通过',
      value: 450,
    },
    {
      label: '已投简历',
      value: 50,
    },
    {
      label: '待面试',
      value: 2,
    },
    {
      label: '收藏',
      value: 30,
    },
  ];
  return (
    <Row between={true}>
      {totalData.map((item, index) => (
        <View key={index} style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.value}</Text>
          <SizeBox height={5} />
          <Text style={{fontSize: 12, color: '#555'}}>{item.label}</Text>
        </View>
      ))}
    </Row>
  );
};

// 渲染广告
const renderAdModule = () => {
  const adData = [
    {
      label: '简历刷新',
      value: '提升曝光',
      icon: 'sync-outline',
    },
    {
      label: '简历定制',
      value: '高薪求职',
      icon: 'document-text-outline',
    },
  ];
  return (
    <View style={styles.block}>
      <AutoImage source={require('../../assets/images/ad.png')} />
      <Row between style={{paddingVertical: 10}}>
        {adData.map((item, index) => (
          <Row key={index} style={{flex: 1}}>
            <Row between style={{flex: 1}}>
              <Row>
                <SizeBox width={10} />
                <Icons name={item.icon} color="#D59064" size={16} />
                <SizeBox width={5} />
                <Text style={{fontSize: 13, fontWeight: '500'}}>
                  {item.label}
                </Text>
              </Row>
              <Row>
                <Text style={{fontSize: 13, color: 'grey'}}>{item.value}</Text>
                <Icons name="chevron-forward" size={15} color="grey" />
                <SizeBox width={10} />
              </Row>
            </Row>
            {index < adData.length - 1 ? (
              <SizeBox
                style={{backgroundColor: '#B9B9B9', width: 1, height: 14}}
              />
            ) : null}
          </Row>
        ))}
      </Row>
    </View>
  );
};

// 渲染常用功能
const renderCommonFunction = () => {
  const data = [
    {
      icon: 'reader',
      title: '在线简历',
      tips: '带优化2项',
    },
    {
      icon: 'folder-open',
      title: '附件简历',
      tips: '及时更新',
    },
    {
      icon: 'heart',
      title: '求职意向',
      tips: '离职-随时到岗',
    },
    {
      icon: 'bag-handle',
      title: '道具商城',
      tips: '直豆/其他',
    },
  ];
  return (
    <View style={[styles.block]}>
      <Text style={[styles.blockTitle, styles.blockPadding]}>常用功能</Text>
      <SizeBox height={8} />
      <Row>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              position: 'relative',
              alignItems: 'center',
            }}>
            <Icons
              style={{position: 'absolute', right: 25, top: 14}}
              name="ellipse"
              color="#FFA572"
              size={24}
            />
            <Icons style={{}} name={item.icon} color="#1FB7BA" size={36} />
            <SizeBox height={5} />
            <Text style={{fontSize: 12}}>{item.title}</Text>
            <SizeBox height={3} />
            <Text style={{fontSize: 11, color: 'grey'}}>{item.tips}</Text>
          </View>
        ))}
      </Row>
      <SizeBox height={20} />
    </View>
  );
};

// 其他功能
const renderOtherFunction = () => {
  const data = [
    {icon: 'document-attach-outline', name: '直聘分'},
    {icon: 'videocam-outline', name: '直播招聘'},
    {icon: 'create-outline', name: '面试刷题'},
    {icon: 'search-circle-outline', name: '薪资查询'},
    {icon: 'hand-right-outline', name: '16型测试'},
    {icon: 'trending-up-outline', name: '高薪机会'},
    {icon: 'shield-checkmark-outline', name: '规则中心'},
    {icon: 'construct-outline', name: '仲裁厅'},
    {icon: 'person-outline', name: '我的客服'},
    {icon: 'skull-outline', name: '防骗指南'},
    {icon: 'reader-outline', name: '隐私规则'},
    {icon: 'business-outline', name: '精选公司'},
  ];
  return (
    <View style={styles.block}>
      <Text style={[styles.blockTitle, styles.blockPadding]}>其他功能</Text>
      <Row style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              width: '25%',
              paddingVertical: 12,
              alignItems: 'center',
            }}>
            <Icons name={item.icon} size={25} color="#5A5A5A" />
            <SizeBox height={8} />
            <Text style={{fontSize: 12, color: '#5A5A5A'}}>{item.name}</Text>
          </View>
        ))}
      </Row>
      <SizeBox height={10} />
    </View>
  );
};

// 渲染底部版权信息
const renderBottomInfo = () => {
  return (
    <Text
      style={{
        textAlign: 'center',
        fontSize: 12,
        color: 'grey',
        lineHeight: 24,
        paddingVertical: 15,
      }}>
      客服电话 400-065-5799 工作时间 8:00-22:00 {'\n'}
      老年人直连热线 400-661-6030 工作时间 8:00-22:00 {'\n'}
      算法举报与未成年人举报渠道同上{'\n'}
      人力资源服务许可证 营业执照 朝阳区人社局监督电话 {'\n'}
      京ICP备19000001号-1 京ICP证17001号{'\n'}
      算法备案信息
    </Text>
  );
};

const Index: React.FC = () => {
  const [headerHeight, setHeaderHeight] = React.useState(50);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, scrollMax], // 根据滚动的高度范围调整
    outputRange: [0, -38], // 初始比例为1，最终比例为0.5
    extrapolate: 'clamp', // 超出范围时保持最后一个值
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View style={styles.content}>
          <View style={{opacity: 0}}>
            <Header />
          </View>

          {/* 个人信息 */}
          {renderMyInfo(new Animated.Value(0))}

          <SizeBox height={20} />

          {/* 顶部统计数据 */}
          {renderTotalData()}

          <SizeBox height={20} />
          {/* 广告模块 */}
          {renderAdModule()}

          <SizeBox height={10} />
          {/* 常用功能 */}
          {renderCommonFunction()}

          <SizeBox height={10} />
          {/* 专属 */}
          <AutoImage source={require('../../assets/images/suggestion.png')} />

          <SizeBox height={10} />
          {/* 其他功能 */}
          {renderOtherFunction()}
          {/* 底部版权信息 */}
          {renderBottomInfo()}
        </View>
      </Animated.ScrollView>
      <View
        style={{position: 'absolute', left: 0, right: 0, top: 0}}
        onLayout={handleLayout}>
        <Header />
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          left: 10,
          right: 0,
          top: headerHeight,
          transform: [{translateY: translateY}],
        }}>
        {
          renderMyInfo(scrollY, true)
          // renderAvatarName(new Animated.Value(200))
        }
      </Animated.View>
    </View>
  );
};

export default Index;
