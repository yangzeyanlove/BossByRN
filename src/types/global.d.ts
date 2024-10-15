/**
 * 全局类型声明文件
 */
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 职位信息
export interface IJobInfo {
  jobName: string;
  salaryDesc: string;
  brandName: string;
  brandStageName: string;
  brandScaleName: string;
  jobLabels: string[];
  skills: string[];
  welfareList: string[];
  bossAvatar: string;
  bossName: string;
  bossTitle: string;
  cityName: string;
  areaDistrict: string;
  businessDistrict: string;
  jobExperience: string;
  jobDegree: string;
  brandLogo: string;
  brandIndustry: string;
}

// 根路由参数类型
export type RootStackParamList = {
  Home: undefined;  // 首页
  JobDetail: IJobInfo; // 职位详情
  // Details: { itemId: number; otherParam: string }; // 如果需要参数
};
// 首页导航类型
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
// 职位详情页面导航类型
export type JobDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'JobDetail'
>;
export type JobDetailRouteProp = RouteProp<RootStackParamList, 'JobDetail'>;
