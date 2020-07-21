import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
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
    // 全选
    allChecked: true,
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
    const carts = wx.getStorageSync('carts') || [];
    this.setData({
      address,
    });
    this.setCart(carts);
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
    console.log(1);
  },
  // 选中状态改变
  handleItemChange(e) {
    // 拿到修改改状态的id值
    const id = e.currentTarget.dataset.id;
    // 拿到数据
    let { carts } = this.data;
    // 根据id查找当前元素的 索引
    let index = carts.findIndex((v) => v.goods_id === id);
    // 将改元素选中状态取反
    carts[index].check = !carts[index].check;
    this.setCart(carts);
  },
  // 全选状态改变
  handleItemAllChange() {
    // 获取data中的数据
    let { carts, allChecked } = this.data;
    // 将当前全选状态取反
    allChecked = !allChecked;
    // 遍历购物车数据，让单个商品选择状态 和 全选相等
    carts.forEach((v) => (v.check = allChecked));
    // 重新计算，和更新数据
    this.setCart(carts);
  },
  // 加减
  async handleItemNumEdit(e) {
    // 获取被点击商品的id,和操作方式
    const { id, operation } = e.currentTarget.dataset;
    // 获取购物车数据
    let { carts } = this.data;
    // 获取要被修改的商品的索引
    const index = carts.findIndex((v) => v.goods_id == id);
    // 当购物车商品的数量为1，用户点击 "-" 时，提示是否删除
    if (carts[index].num === 1 && operation === -1) {
      const res = await showModal({ content: '是否删除该商品' });
      if (res.confirm) {
        carts.splice(index, 1);
        this.setCart(carts);
      }
    } else {
      // 执行加减操作
      carts[index].num += operation;
      // 总价，总量，更新数据
      this.setCart(carts);
    }
  },
  // 全选，总价，总量，跟新数据
  setCart(carts) {
    // 全选选中
    let allChecked = true;
    // 计算总价格和总数量
    let totalPrice = 0;
    let totalNum = 0;
    carts.forEach((item) => {
      if (item.check) {
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
      } else {
        allChecked = false;
      }
    });
    // 当carts为空时，foreach不执行
    allChecked = carts.length !== 0 ? allChecked : false;
    this.setData({
      carts,
      allChecked,
      totalPrice,
      totalNum,
    });
    wx.setStorageSync('carts', carts);
  },
  // 结算
  async handlePay() {
    // 获取收货地址和商品数量信息
    const { address, totalNum } = this.data;
    // 判断有无收货地址
    if (!address.userName) {
      await showToast({title: '请先获取收货地址'})
      return;
    }
    // 判断有无商品
    if (totalNum === 0) {
      await showToast({title: '亲，还有商品呢！'})
      return
    }
    // 跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
});
