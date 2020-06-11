// pages/info/info.js
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_users()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  // 搜索
  get_user:function(){

  },

  // 获得人数
  get_users: function () {
    that = this
    wx.request({
      url: app.globalData.url + '/xusers/',
      data: {
        "openid": app.globalData.openid,
        "name":that.data.name
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == "200") {
          that.setData({
            users: res.data.users
          })

        }
      }
    })
  },

  // 查看人物名片
  toUserDetail:function(e){
    var user_id = e.currentTarget.dataset.user_id
    wx.navigateTo({
      url: '../user_card/user_card?user_id='+user_id
    })
  },

  // 输入的名字
  name:function(e){
    console.log(e)
    this.data.name=e.detail.value
  },

  // 搜索
  search:function(){
    that = this
    that.get_users()
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