/**
 * 职位信息组件
 */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import SizeBox from '../../components/size-box';
import ThemeConfig from '../../config/theme';

interface JobItemProps {
  onPressHandler: () => void;
  info: {
    jobName: string;
    salaryDesc: string;
    brandName: string;
    brandStageName: string;
    brandScaleName: string;
    jobLabels: string[];
    skills: string[];
    bossAvatar: string;
    bossName: string;
    bossTitle: string;
    areaDistrict: string;
    businessDistrict: string;
  };
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // 如果子元素有垂直方向上的差异，可以居中它们
  },
  jobName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  labelList: {
    flexDirection: 'row',
  },
  lableItem: {
    backgroundColor: '#F5F5F5',
    color: '#5D5D5D',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 5,
    fontSize: 12,
  },
  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bossInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
      <View style={styles.itemTop}>
        <Text style={styles.jobName}>{info.jobName}</Text>
        <Text style={styles.salaryDesc}>{info.salaryDesc}</Text>
      </View>
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
      <View style={styles.labelList}>
        {[...info.jobLabels, ...info.skills]
          .slice(0, 3)
          .map((label: string, index: number) => (
            <Text style={styles.lableItem} key={index}>
              {label}
            </Text>
          ))}
      </View>
      <SizeBox height={10} />
      <View style={styles.infoBottom}>
        <View style={styles.bossInfo}>
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
        </View>
        <Text style={styles.address}>
          {info.areaDistrict + ' ' + info.businessDistrict}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobItem;
