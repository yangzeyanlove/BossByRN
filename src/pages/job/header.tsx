import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import SizeBox from '../../components/size-box';
import Row from '../../components/row';
import HeaderWrap from '../../components/header-wrap';

const styles = StyleSheet.create({
  headerTop: {
    paddingHorizontal: 18,
    paddingTop: 4,
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
    <HeaderWrap>
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
    </HeaderWrap>
  );
};

export default JobHeader;
