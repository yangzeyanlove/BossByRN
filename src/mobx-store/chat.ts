import { makeAutoObservable, runInAction } from 'mobx';
import request from '../common/request';

class ChatStore {
  allData: any[] = [];
  list: any[] = [];
  loading: boolean = false;
  refreshing: boolean = false;
  currentIndex: number = 0;
  loadedTypeArr: string[] = [];
  // 其他数据
  others = [
    {
      'uid': 1141998241,
      'name': '易宝软件 发布了新职位',
      'avatar': '',
      'brandName': '',
      'title': '',
      'date': '09:33',
      'type': '',
      'content': '40位Boss新发布',
      'isLatest': true,
      'isNotice': false,
    },
    {
      'uid': 1141998241,
      'name': '通知',
      'avatar': '',
      'brandName': '系统通知',
      'title': '',
      'date': '星期四',
      'type': '',
      'content': '简历曝光将降低',
      'isLatest': false,
      'isNotice': true,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  changeTab(index: number, type: string) {
    this.currentIndex = index;
    if (!this.loadedTypeArr.includes(type)) {
      this.loadedTypeArr.push(type);
    }
  }

  // Action: 获取数据的逻辑
  async fetchData(isRefresh = false) {
    // 正在请求中，不重复请求
    if (this.loading) {
      return;
    }

    runInAction(() => {
      // 如果是下拉刷新
      if (isRefresh) {
        this.refreshing = true;
      }
      // 开启请求中
      this.loading = true;
    });

    try {
      const res = await request({
        url: 'https://result.eolink.com/1PU8uLH9435a64bcd63e35fcb4dd6948bff5e7ebb444977?uri=/chat/list-content',
      });

      runInAction(() => {
        if (res && res.zpData && res.zpData.result) {
          this.list = isRefresh ? res.zpData.result : [...this.list, ...res.zpData.result];
        }
        this.allData = [...this.others, ...this.list];
        // this.loading = false;
        // this.refreshing = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.refreshing = false;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
        this.refreshing = false;
      });
    }
  }
}

export default new ChatStore();
