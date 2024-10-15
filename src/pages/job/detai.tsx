import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Animated,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {JobDetailNavigationProp, JobDetailRouteProp} from '../../types/global';
import SizeBox from '../../components/size-box';
import ThemeConfig from '../../config/theme';
import Row from '../../components/row';
import Divider from '../../components/divider';
import LableList from '../../components/label-list/index.tsx';
import {JoinString} from '../../common/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerHolder: {
    opacity: 0,
  },
  header: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  itemTop: {
    alignItems: 'flex-start', // 如果子元素有垂直方向上的差异，可以居中它们
  },
  jobName: {
    flex: 1,
    fontSize: 25,
    fontWeight: '500',
  },
  salaryDesc: {
    flexShrink: 1,
    color: ThemeConfig.PrimaryColor,
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 4,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ECECEC', // 边框颜色
  },
  ctrl: {
    backgroundColor: ThemeConfig.PrimaryColor, // 按钮背景颜色
    borderRadius: 8, // 圆角半径，值越大越圆
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  colorGrey: {
    color: '#5D5D5D',
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  jobContent: {
    lineHeight: 25,
    fontSize: 15,
    color: '#585858',
  },
});

interface HeaderProps {
  isHolder?: boolean;
  scrollY: Animated.Value;
  navigation: JobDetailNavigationProp;
}
const Header: React.FC<HeaderProps> = ({isHolder, scrollY, navigation}) => {
  const [opacity, setOpacity] = React.useState(0);
  const _style = isHolder
    ? styles.headerHolder
    : {...styles.header, backgroundColor: `rgba(255,255,255, ${opacity})`};
  const _titleStyle = {
    fontSize: 16,
    opacity: opacity,
  };

  React.useEffect(() => {
    const listenerId = scrollY.addListener(({value}) => {
      value = value >= 0 ? value : 0;
      if (value < 100 * 2) {
        setOpacity(Math.min(value / 100, 1));
      }
    });
    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  return (
    <View style={_style}>
      <SafeAreaView>
        <SizeBox height={StatusBar.currentHeight} />
        <Row between style={styles.headerContent}>
          <Row>
            <Icons
              name="chevron-back-outline"
              size={28}
              color="#292929"
              onPress={() => navigation.goBack()}
            />
            <SizeBox width={10} />
            <Text style={_titleStyle}>前端开发工程师</Text>
          </Row>
          <Row>
            <Icons name="star-outline" size={24} color="#292929" />
            <SizeBox width={16} />
            <Icons name="share-outline" size={24} color="#292929" />
            <SizeBox width={16} />
            <Icons name="ellipsis-horizontal" size={24} color="#292929" />
          </Row>
        </Row>
        {/* <SizeBox height={10} /> */}
      </SafeAreaView>
    </View>
  );
};

interface JobItemProps {
  navigation: JobDetailNavigationProp;
  route: JobDetailRouteProp;
}
const JobDetail: React.FC<JobItemProps> = ({navigation, route}) => {
  // 创建一个 Animated.Value 来追踪滚动事件的偏移量
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const info = route.params;
  const content = `职位类型：全职、兼职
岗位职责：
1. 负责公司网站和应用的前端开发，确保界面的兼容性和性能。
2. 根据产品需求和设计稿，开发高质量、响应式的用户界面。
3. 优化前端性能，提升用户体验，解决浏览器兼容性问题。
4. 与后端开发人员密切配合，完成接口对接和数据交互。
5. 维护和更新现有系统，修复bug，提升系统稳定性。
6. 参与前端技术选型，提出技术改进建议，推动技术创新。
7. 编写前端开发文档，确保项目的可维护性和可扩展性。
岗位要求：
1. 计算机科学或相关专业本科及以上学历。
2. 3年以上前端开发经验，熟悉HTML、CSS、JavaScript等前端技术。
3. 精通至少一种前端框架，如React、Vue.js或Angular。
4. 熟悉前端构建工具和版本控制工具，如Webpack、Git等。
5. 具备良好的前端性能优化能力，了解常见的性能瓶颈及解决方案。
6. 具有良好的跨浏览器兼容性处理经验，能够解决各种浏览器中的兼容性问题。
7. 具备良好的沟通能力和团队合作精神，能够与设计师和后端工程师协作完成项目。
8. 对前端技术有浓厚兴趣，愿意持续学习和探索新的技术。
福利待遇：
- 具有竞争力的薪资和奖金制度。
- 五险一金，带薪年假，节日福利。
- 提供丰富的培训和职业发展机会。
- 良好的工作环境和团队氛围。`;

  const getLocation = (): string =>
    JoinString([info.cityName, info.areaDistrict, info.businessDistrict]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollContent}
        scrollEventThrottle={16} // 设置滚动事件更新频率
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}], // 追踪滚动的 y 轴偏移
          {useNativeDriver: false}, // 不使用 native driver，因为我们要改变透明度
        )}>
        {/* 占位组件 */}
        <Header isHolder={true} scrollY={scrollY} navigation={navigation} />
        {/* 职位基本信息 */}
        <Row between style={styles.itemTop}>
          <Text style={styles.jobName}>{info.jobName}</Text>
          <Text style={styles.salaryDesc}>{info.salaryDesc}</Text>
        </Row>
        <SizeBox height={8} />
        <Row>
          <Icons name="location" size={16} color="#B9B9B9" />
          <SizeBox width={3} />
          <Text style={styles.colorGrey}>{getLocation()}</Text>
          <SizeBox width={15} />
          <Icons name="bag" size={16} color="#B9B9B9" />
          <SizeBox width={3} />
          <Text style={styles.colorGrey}>{info.jobExperience}</Text>
          <SizeBox width={15} />
          <Icons name="school" size={16} color="#B9B9B9" />
          <SizeBox width={3} />
          <Text style={styles.colorGrey}>{info.jobDegree}</Text>
        </Row>
        <Divider marginVertical={24} />
        {/* boss信息 */}
        <SizeBox height={5} />
        <Row between>
          <Row>
            <Image
              source={{uri: info.bossAvatar}}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
            <SizeBox width={10} />
            <View>
              <Text style={{fontSize: 16}}>{info.bossName}</Text>
              <SizeBox height={5} />
              <Text style={{color: '#868686'}}>
                {info.brandName + '·' + info.bossTitle}
              </Text>
              <SizeBox height={5} />
              <Text style={{color: '#BBBBBB', fontSize: 13}}>今日活跃</Text>
            </View>
          </Row>
          <Icons name="chevron-forward" size={20} color="#B9B9B9" />
        </Row>
        <Divider marginVertical={24} />
        {/* 工作地址 */}
        <Row between>
          <View>
            <Text style={styles.blockTitle}>工作地址</Text>
            <SizeBox height={12} />
            <Text style={{color: '#696969', fontSize: 15}}>
              {getLocation() + '详细地址信息'}
            </Text>
            <SizeBox height={12} />
            <LableList
              data={['距您5.5千米', '骑行约20分钟', '地铁约40分钟']}
              fontSize={13}
              paddingHorizontal={8}
              paddingVertical={4}
              marginRight={10}
            />
          </View>
          <Icons name="chevron-forward" size={20} color="#B9B9B9" />
        </Row>
        <Divider marginVertical={24} />
        {/* 职位详情 */}
        <Text style={styles.blockTitle}>职位详情</Text>
        <SizeBox height={12} />
        <LableList
          data={info.skills.slice(0, 3)}
          fontSize={13}
          paddingHorizontal={8}
          paddingVertical={4}
          marginRight={10}
        />
        <Text style={styles.jobContent}>{content}</Text>
        <SizeBox height={24} />
        {/* 员工福利 */}
        <Row>
          <Text style={styles.blockTitle}>员工福利</Text>
          <Icons name="help-circle-outline" size={20} />
        </Row>
        <SizeBox height={12} />
        <LableList
          data={info.welfareList.slice(0, 3)}
          fontSize={13}
          paddingHorizontal={8}
          paddingVertical={4}
          marginRight={10}
        />
        <Divider marginVertical={24} />
        <Row between>
          <Row style={{flex: 1}}>
            <Image
              source={{uri: info.brandLogo}}
              style={{width: 50, height: 50}}
            />
            <SizeBox width={10} />
            <View style={{flex: 1}}>
              <Text
                style={{fontSize: 16}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {info.brandName}
              </Text>
              <SizeBox height={5} />
              <Text style={{color: '#868686'}}>
                {JoinString([
                  info.brandStageName,
                  info.brandScaleName,
                  info.brandIndustry,
                ])}
              </Text>
            </View>
          </Row>
          <Icons
            style={{flexShrink: 1}}
            name="chevron-forward"
            size={20}
            color="#B9B9B9"
          />
        </Row>
        <SizeBox height={24} />
        <Image
          source={require('../../assets/images/map.png')}
          style={{width: '100%', height: 200}}
        />
        <SizeBox height={24} />
        <Row between>
          <Row>
            <Icons name="home" size={14} color="#B9B9B9" />
            <SizeBox width={4} />
            <Text>距离我的住址5.6千米</Text>
          </Row>
          <Text>去修改</Text>
        </Row>
        <Divider marginVertical={15} />
        <Row>
          <Icons name="shield-checkmark" size={20} color="#306DFA" />
          <SizeBox width={5} />
          <Text style={{fontWeight: '500'}}>BOSS安全提示</Text>
        </Row>
        <SizeBox height={8} />
        <Text style={{color: '#666', fontSize: 13, lineHeight: 24}}>
          BOSS直聘严禁用人单位和招聘者用户做出任何损害求职者合法权益的违法违规行为，包括但不限于扣押求职者证件、收取求职者财物、向求职者集资、让求职者入股、诱导求职者异地入职、异地参加培训、违法违规使用求职者简历等，您一旦发现此类行为，
          请立即举报
        </Text>
        <SizeBox height={120} />
      </Animated.ScrollView>
      <Header scrollY={scrollY} navigation={navigation} />
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.ctrl} onPress={() => {}}>
          {/* 按钮内的文字 */}
          <Text style={styles.buttonText}>立即沟通</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobDetail;
