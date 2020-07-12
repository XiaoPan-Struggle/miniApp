// 获取同时发送异步请求的次数
// 发送一次就加加，成功或失败都减减
let ajaxNum = 0
export const request = (params) => {
  ajaxNum ++
  return new Promise((resolve,reject) => {
    wx.showLoading({
      title: '加载中',
    })
    const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      url: baseURL + params.url,
      success:(result) => {
        resolve(result.data.message);
      },
      fail:(err) => {
        reject(err)
      },
      complete: () => {
        ajaxNum --
        wx.hideLoading()
      }
    })
  })
}