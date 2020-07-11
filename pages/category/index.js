import { request } from '../../request/index';
import regeneratorRuntiome from '../../lib/runtime.js/runtime';
// pages/category/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 分类列表数据
    leftMenuList: [],
    // 分类内容数据
    rightContent: [],
    // 控制点击变化样式
    currentIndex: 0,
    scrollTop: 0,
  },
  // 分类页面总数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取数据存入本地
    // 2.判断是否有本地数据，有就判断是否过期，没有就发请求
    // 3.判断数据是否过期，有就发请求，没有就渲染
    const Cates = wx.getStorageSync('cates');
    // 判断是否有数据
    if (!Cates) {
      // 没有数据就发请求
      this.getCates();
    } else {
      // 有就判断是否过期
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        // left列表
        let leftMenuList = this.Cates.map((x) => x.cat_name);
        // right内容
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
        });
      }
    }
  },
  // 获取分类数据
  async getCates() {
    const res = await request({
      url: '/categories',
    });
    // 总数据
    this.Cates = res;
    // 将数据存入本地
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });
    // left列表
    let leftMenuList = this.Cates.map((x) => x.cat_name);
    // right内容
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent,
    });
  },
  // 获取点击的index
  handleItemIndex(e) {
    const { index } = e.currentTarget.dataset;
    // right内容
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      // 每次做列表切换，右内容都从顶部开始
      scrollTop: 0,
    });
  },
});
