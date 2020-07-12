import { request } from '../../request/index';
import regeneratorRuntiome from '../../lib/runtime.js/runtime';
// pages/goods_list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // tab数据
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true,
      },
      {
        id: 1,
        value: '销量',
        isActive: false,
      },
      {
        id: 2,
        value: '价格',
        isActive: false,
      },
    ],
    // 获取的数据
    goodsList:[]
  },
  // 数据列表发送请求参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPage: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // option是分类页面传递过来的cid值
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  // 子组件传递的数据
  handleItemChange (e) {
    // 获取点击当前的索引
    const {index} = e.detail
    // 重新拷贝一份数据
    let tabs = JSON.parse(JSON.stringify(this.data.tabs));
     // 遍历数组
     tabs.forEach((item, i) => {
      i === index ? (item.isActive = true) : (item.isActive = false);
    });
    // 更新数据
    this.setData({
      tabs,
    });
  },
  // 获取商品列表数据
  async getGoodsList () {
    const res = await request({
      url:"/goods/search",
      data:this.QueryParams
    })
    // 计算总页数t
    this.totalPage = Math.ceil(res.total / this.QueryParams.pagesize)
    // 将触底时的发送请求的数据和上一页获取的请求，解构赋值
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 请求完成直接关闭下拉窗口
    wx.stopPullDownRefresh()
  },
  // 上拉，页面触底事件
  onReachBottom () {
    // 触底之后判断是否还有数据
      // 判断当前页码和总页码大小
      if (this.QueryParams.pagenum >= this.totalPage){
        wx.showToast({
          title: '只有这么多啦',
          icon: 'success',
          duration: 600,
          mask: true,
        });
      }else{
        // 每次触底都让自己当前页面自增1
        this.QueryParams.pagenum ++
        // 重新获取数据
        this.getGoodsList()
      }
    // 有就发送请求
    // 没有就提示用户
  },
  // 下拉刷新
  onPullDownRefresh () {
    // 清空数据，页码回到初始，发送请求
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList ()
  }
});
