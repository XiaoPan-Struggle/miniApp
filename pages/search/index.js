import { request } from '../../request/index';
import regeneratorRuntiome from '../../lib/runtime.js/runtime';
// pages/search/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 搜索返回的数据
    goods: [],
    // 取消的显示和隐藏
    isFocus:false,
    // 输入框的值
    inpValue:''
  },
  TimeId: -1,
  onShow: function () {},
  // 监听输入框的值的改变
  handleInput(e) {
    // 输入框值
    const { value } = e.detail;
    // 验证合法性
    if (!value.trim()) {
      this.setData({
        goods:[],
        isFocus: false
      })
      return;
    }
    this.setData({
      isFocus: true
    })
    // 发送请求
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  // 发送请求
  async qsearch(query) {
    const res = await request({ url: '/goods/qsearch', data: { query } });
    console.log(res);
    this.setData({
      goods: res,
    });
  },
  // 取消
  handleCancel () {
    this.setData({
      inpValue:'',
      isFocus: false,
      goods: []
    })
  }
});
