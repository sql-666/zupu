// pages/login/login.js
var request = require('../../request.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // request.register(); //注册
  },

  formSubmit:function(e){
    console.log(e.detail.value)
    var data = e.detail.value
    for (var i in data) {
      if (!app.dataFormat(i)){
        wx.showToast({
          title: '格式错误！',
        })
        return 
      }
    }

    wx.request({
      url: 'http://127.0.0.1:8000/myapp/xlogin/',
      data:data,
      method:'POST',
      success:function(res){
        console.log(res)
        if (res.data.code==200){
          app.globalData.account = data.account
          app.globalData.password = data.password
          app.globalData.openid = data.openid
          wx.redirectTo({
            url: '../index/index',           
          })
        }else{
          wx.showToast({
            image:'/static/warning.png',
            title: '登录失败',
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})