import { makeAutoObservable, runInAction } from 'mobx';
import request from '../common/request';

class GoodArticleListStore {
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
        url: 'http://rap2api.taobao.org/app/mock/320664/good_article_list',
      });

      runInAction(() => {
        if (res && res.zpData && res.zpData.list) {
          this.list = isRefresh ? res.zpData.list : [...this.list, ...res.zpData.list];
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

const goodArticleListStore = new GoodArticleListStore();
export default goodArticleListStore;
