// 有了，item信息
export interface IHaveItem {
  addTime: number;
  postUserInfo: {
    avatar: string;
    bcName: string;
    subTitle: string;
  };
  content: string;
  picList: any;
  coverImg: any;
  file: any;
  commentCount: number;
  collectCount: number;
  likeCount: number;
}
