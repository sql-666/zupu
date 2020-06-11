// pages/user_card/user_card.js
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [{ "url": '/static/x.jpg' }, { "url": '/static/x2.jpg' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.data.user_id = options.user_id
    that.get_user_info(options.user_id)
  },

  // 查看人物详情
  get_user_info: function (user_id){
    that = this
    var openid = app.globalData.openid
    wx.request({
      url: app.globalData.url +'/get_user_info/',
      data: {
        openid:openid,
        user_id: user_id
      },
      method: 'GET',
      success: function(res) {
        if (res.data.code==200){
          that.setData({
            user_info: res.data.user_info
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