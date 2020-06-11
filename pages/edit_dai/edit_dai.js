// pages/edit_dai/edit_dai.js
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dai:[{name:"始祖"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.get_dai()
  },
  //获取全部的代数
  get_dai:function(){
    that = this
    var data = {"openid":app.globalData.openid}
    wx.request({
      url: app.globalData.url + '/zupu_dai/',
      data: data,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          dai: res.data.zupu
        })
      }
    })
  },

  // 去编辑子嗣
  edit_child:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../edit_zupu/edit_zupu?id=' + e.currentTarget.dataset.id,
    })
  },

  // 新增代数
  edit_dai:function(){
    var that = this
    var new_dai = that.data.dai
    var empty_item = { name: "" }
    new_dai.push(empty_item)
    that.setData({
      dai: new_dai
    })
  },

  // 保存
  complete:function(e){
    
    var openid = app.globalData.openid
    var data = e.detail.value
    data["openid"] = openid
    
    wx.request({
      url: app.globalData.url +'/zupu_dai/',
      data: data,
      method: 'POST',
      success: function (res) {
        if (res.data.code == "200") {
          wx.showToast({
            title: '保存成功',
          })
          that.get_dai()
        }
      }
    })
    console.log("11")
   
    

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