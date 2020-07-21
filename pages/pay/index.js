import {
  getSetting,
  chooseAddress,
  openSetting
} from '../../utils/async';
import regeneratorRuntiome from '../../lib/runtime.js/runtime';
// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 缓存获取到的收货地址信息
    address: {},
    // 购物车数据
    carts: [],
    // 总价格
    totalPrice: 0,
    // 总数
    totalNum: 0,
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    // 获取本地购物车数据
    let carts = wx.getStorageSync('carts') || [];
    carts = carts.filter(v=>v.check)
    // 计算总价格和总数量
    let totalPrice = 0;
    let totalNum = 0;
    carts.forEach((item) => {
      totalPrice += item.num * item.goods_price;
      totalNum += item.num;
    });
    this.setData({
      carts,
      totalPrice,
      totalNum,
      address
    });
  },
  // 获取收获地址信息
  async handleChooseAddress() {
    try {
      // 获取权限状态
      const res = await getSetting();
      const scopeAddress = res.authSetting['scope.address'];
      // 判断权限状态
      if (scopeAddress === false) {
        // 打开设置
        await openSetting();
      }
      // 获取收获地址
      let address = await chooseAddress();
      // 详细收货地址拼接
      address.all =
        address.provinceName +
        address.cityName +
        address.countyName +
        address.detailInfo;
      // 把地址存如本地
      wx.setStorageSync('address', address);
    } catch (err) {
      console.log(err);
    }
  },
  // 支付
  handleOrderPay () {
    // 判断缓存中有没有token
    const token = wx.getStorageSync('token');
    if (!token){
      // 跳转到授权
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
  }
});
