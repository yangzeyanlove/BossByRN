import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import SizeBox from '../../components/size-box';
import Row from '../../components/row';

const styles = StyleSheet.create({
  headerTop: {
    paddingHorizontal: 18,
    paddingTop: 4,
    marginTop: StatusBar.currentHeight, // 内容从状态栏下面开始
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  headerBottom: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 8,
  },
  filterBtn: {
    position: 'relative',
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 14,
  },
  filterTxt: {
    color: '#5E5E5E',
  },
  triangle: {
    position: 'absolute',
    right: 4,
    bottom: 5,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderRightColor: 'transparent',
    borderTopColor: '#C8C6C7',
    transform: [{rotate: '180deg'}],
  },
});

interface JobHeaderProps {
  onFilterChange: (type: string) => void; // 定义父组件传递的方法类型
}

const JobHeader: React.FC<JobHeaderProps> = ({onFilterChange}) => {
  return (
    <>
      <LinearGradient
        colors={['#6AD9D8', '#ACEAEA', 'white']}
        start={{x: 0.5, y: 0}} // 渐变起点
        end={{x: 0.5, y: 0.5}} // 渐变终点
        locations={[0, 0.5, 1]} // 每种颜色对应的百分比位置
      >
        <SafeAreaView>
          {/* 顶部 */}
          <Row between style={styles.headerTop}>
            <Text style={styles.title}>前端开发工程师</Text>
            <Row>
              <Icons name="add" style={styles.icon} />
              <SizeBox width={18} />
              <Icons name="search" style={styles.icon} />
            </Row>
          </Row>
          {/* 底部 */}
          <Row between style={styles.headerBottom}>
            <Row>
              <TouchableOpacity onPress={() => onFilterChange('all')}>
                <Text>全部</Text>
              </TouchableOpacity>
              <SizeBox width={20} />
              <TouchableOpacity onPress={() => onFilterChange('nearby')}>
                <Text>附近</Text>
              </TouchableOpacity>
              <SizeBox width={20} />
              <TouchableOpacity onPress={() => onFilterChange('newest')}>
                <Text>最新</Text>
              </TouchableOpacity>
            </Row>
            <Row>
              <View style={styles.filterBtn}>
                <Text style={styles.filterTxt}>深圳</Text>
                <View style={styles.triangle} />
              </View>
              <SizeBox width={10} />
              <View style={styles.filterBtn}>
                <Text style={styles.filterTxt}>筛选</Text>
                <View style={styles.triangle} />
              </View>
            </Row>
          </Row>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default JobHeader;
