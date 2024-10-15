/**
 * 职位信息组件
 */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import SizeBox from '../../components/size-box';
import ThemeConfig from '../../config/theme';
import {IJobInfo} from '../../types/global';
import Row from '../../components/row';
import LableList from '../../components/label-list';

interface JobItemProps {
  onPressHandler: () => void;
  info: IJobInfo;
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  itemTop: {
    alignItems: 'flex-start', // 如果子元素有垂直方向上的差异，可以居中它们
  },
  jobName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  salaryDesc: {
    flexShrink: 1,
    color: ThemeConfig.PrimaryColor,
    fontSize: 16,
    fontWeight: '500',
  },
  company: {
    color: '#5D5D5D',
  },
  infoBottom: {
    alignItems: 'flex-end',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 15,
    marginRight: 5,
  },
  bossName: {
    fontSize: 12,
    // color: '#FFA500',
  },
  active: {
    fontSize: 12,
    color: '#868686',
  },
  address: {
    fontSize: 12,
    color: '#868686',
  },
});

const JobItem: React.FC<JobItemProps> = ({info, onPressHandler}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPressHandler}>
      <Row style={styles.itemTop}>
        <Text style={styles.jobName}>{info.jobName}</Text>
        <Text style={styles.salaryDesc}>{info.salaryDesc}</Text>
      </Row>
      <SizeBox height={10} />
      <View>
        <Text style={styles.company}>
          {info.brandName +
            '  ' +
            info.brandStageName +
            '  ' +
            info.brandScaleName}
        </Text>
      </View>
      <SizeBox height={10} />
      <LableList
        data={[...info.jobLabels, ...info.skills].slice(0, 3)}
        marginBottom={0}
      />
      <SizeBox height={10} />
      <Row between style={styles.infoBottom}>
        <Row>
          <Image
            style={styles.avatar}
            source={{
              uri: info.bossAvatar,
            }}
          />
          <SizeBox width={5} />
          <View>
            <Text style={styles.bossName}>
              {info.bossName + '·' + info.bossTitle}
            </Text>
            <Text style={styles.active}>今日活跃</Text>
          </View>
        </Row>
        <Text style={styles.address}>
          {info.areaDistrict + ' ' + info.businessDistrict}
        </Text>
      </Row>
    </TouchableOpacity>
  );
};

export default JobItem;
