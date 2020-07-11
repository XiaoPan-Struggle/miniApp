import { request } from '../../request/index';
import regeneratorRuntiome from '../../lib/runtime.js/runtime';
//Page Object
Page({
  data: {
    // 轮播图数据
    swiperList: [],
    //导航列表数据
    catesList:[],
    //获取楼层数据
    floorList:[]
  },
  //options(Object)
  // 页面开始加载就会触发
  onLoad: function (options) {
    // 发送异步请求获取数据
    // 轮播图
    this.getSwiperList()
    // 导航列表
    this.getCatesList()
    // 楼层
    this.getFloorList()
  },
  // 获取轮播图数据据
  async getSwiperList () {
    const res = await request({
      url:"/home/swiperdata"
    })
    this.setData({
      swiperList: res
    })
  },
  // 获取导航列表数据
  async getCatesList () {
    const res = await request({
      url:"/home/catitems"
    })
    this.setData({
      catesList: res
    })
  },
  // 获取导航列表数据
  async getFloorList () {
    const res = await request({
      url:"/home/floordata"
    })
    this.setData({
      floorList: res
    })
  },

  
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
});
