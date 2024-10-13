import { makeAutoObservable, runInAction } from 'mobx';
import request from '../common/request';

class JobListStore {
  list: any[] = [];
  loading: boolean = false;
  refreshing: boolean = false;

  constructor() {
    makeAutoObservable(this);
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
        url: 'https://result.eolink.com/1PU8uLH9435a64bcd63e35fcb4dd6948bff5e7ebb444977?uri=/job/new-list',
      });

      runInAction(() => {
        if (res && res.zpData && res.zpData.jobList) {
          this.list = isRefresh ? res.zpData.jobList : [...this.list, ...res.zpData.jobList];
        }
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

const jobListStore = new JobListStore();
export default jobListStore;
