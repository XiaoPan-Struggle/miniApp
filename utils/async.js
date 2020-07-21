import { reject } from "async"


export const getSetting = () => {
  return new Promise(( resolve, reject ) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const chooseAddress = () => {
  return new Promise(( resolve, reject ) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const openSetting = () => {
  return new Promise(( resolve, reject ) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const showModal = ({content}) => {
  return new Promise(( resolve, reject ) => {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const showToast = ({title}) => {
  return new Promise(( resolve, reject ) => {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      mask: false,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const login = () => {
  return new Promise(( resolve, reject ) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}