// 有了栏目，精选列表，item信息
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

// 有了栏目，好文列表，item信息
export interface IGoodArticleItem {
  addTime: number;
  title: string;
  postUserInfo: {
    nickname: string;
    avatar: string;
    bcName: string;
    subTitle: string;
  };
  content: string;
  picList: any;
  coverImg: {
    thumbnailUrl: string;
  };
  file: any;
  commentCount: number;
  collectCount: number;
  likeCount: number;
}
