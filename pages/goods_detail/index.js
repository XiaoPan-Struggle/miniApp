import { request } from '../../request/index';
import regeneratorRuntiome from '../../lib/runtime.js/runtime';
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前商品详情数据
    goodsObj: {}
  },
  // 大图预览
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail (goods_id)
  },
  // 获取当商品的详情数据
  async getGoodsDetail (goods_id) {
    const goodsObj = await request({
      url:'/goods/detail',
      data: {goods_id}
    })
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        pics: goodsObj.pics,
        // iphone部分手机，不识别 webp图片格式
        // 最好找到后台 让他进行修改
        // 临时自己改，要确保后台存在 1.webp =》 1.jpg
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })
  },
  // 论图点击预览大图
  handlePrevewImage (e) {
    // 构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    // 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 加入购物车事件
  handleCartAdd () {
    // 获取存储本地的数据 cart
    let carts = wx.getStorageSync('carts') || []
    // 判断当前商品是否以及存在，存在就数量加一，未存在就添加数据
    const index = carts.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index == -1) {
      // 不存在，添加数据
      this.GoodsInfo.num = 1;
      // 商品选中状态
      this.GoodsInfo.check = true;
      carts.push(this.GoodsInfo);
    } else {
      // 存在，数量+1
      carts[index].num ++;
    }
    // 将数据重新添加到缓存中
    wx.setStorageSync('carts', carts);
    // 添加购物车弹窗
    wx.showToast({
      title: '已添加购物车',
      icon: 'success',
      mask: true
    });
  }
})