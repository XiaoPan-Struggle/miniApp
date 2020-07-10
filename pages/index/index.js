import { request } from '../../request/index';
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
  getSwiperList () {
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 获取导航列表数据
  getCatesList () {
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
    }).then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  },
  // 获取导航列表数据
  getFloorList () {
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
    }).then(result => {
      this.setData({
        floorList: result.data.message
      })
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
