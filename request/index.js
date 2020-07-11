export const request = (params) => {
  return new Promise((resolve,reject) => {
    const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      url: baseURL + params.url,
      success:(result) => {
        resolve(result.data.message);
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}