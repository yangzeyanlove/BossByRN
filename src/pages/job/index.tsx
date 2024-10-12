import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  // SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/global';
import Header from './header';
import request from '../../common/request';
import ThemeConfig from '../../config/theme';
import SizeBox from '../../components/size-box';

// const data = Array.from({length: 100}, (_, index) => ({
//   id: index + 1, // 生成从1开始的唯一ID
//   title: `Title ${index + 1}`,
// }));

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

const ItemInfo = ({info}: {info: any}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const goToDetail = () => {
    navigation.push('JobDetail');
  };

  return (
    <TouchableOpacity style={styles.item} onPress={goToDetail}>
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

function Index(): React.JSX.Element {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (isRefresh = false) => {
    console.log(isRefresh);
    if (loading) {
      return false;
    }

    setLoading(true);
    try {
      const res = await request({
        url: 'https://result.eolink.com/1PU8uLH9435a64bcd63e35fcb4dd6948bff5e7ebb444977?uri=/job/new-list',
      });

      if (res && res.zpData && res.zpData.jobList) {
        setItems(res.zpData.jobList);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect fetching data...');
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={items}
        renderItem={({item}) => (
          // <Text onPress={() => handlePress}>{item.title}</Text>
          <ItemInfo info={item} />
        )}
        keyExtractor={() => Math.random().toString(36)}
      />
    </View>
  );
}

export default Index;
