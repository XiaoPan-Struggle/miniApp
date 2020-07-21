import { request } from '../../request/index';
import { login } from '../../utils/async';
import regeneratorRuntiome from '../../lib/runtime.js/runtime';
// pages/auth/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  // 授权
  async handleGetUserInfo(e) {
    console.log(e.detail);
    const { encryptedData, rawData, iv, signature } = e.detail;
    const { code } = await login();
    const loginParams = { encryptedData, rawData, iv, signature, code };
    const res = await request({
      url: '/users/wxlogin',
      data: loginParams,
      method: 'post',
    });
    wx.navigateBack({
      delta: 1
    });
  },
});
