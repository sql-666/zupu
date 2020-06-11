// pages/people_list/people_list.js
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: [{ name: "ee", select_xh: "", gender: "1", myid: "11" }, { name: "osd", select_xh: "", gender: "2", myid:"22"}],
    xh:0,
    old_select:[],
    comfirm_select:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_users()
  },
  // 获得人数
  get_users:function(){
    that = this
    wx:wx.request({
      url: app.globalData.url+'/xusers/',
      data: {
        "openid": app.globalData.openid
      },
      method: 'GET',
      success: function(res) {
        if (res.data.code=="200"){
          that.setData({
            users:res.data.users
          })

        }
      }
    })
  },

  //选中的人员
  selected:function(e){
    console.log(e)
    var selected = e.detail.value
    var new_users = this.data.users
    if (selected.length>10){
      wx.showToast({
        image:"/static/warning.png",
        title: '数量超出',
      })
      return
    }

    // 清除旧的
    var old_select = this.data.old_select
    for (var j = 0; j < old_select.length; j++){
      var myxh = parseInt(old_select[j])
      new_users[myxh].select_xh=""
    }

    // 赋值新的
    for (var i = 0;i<selected.length;i++){
      var xh = parseInt(selected[i])
      new_users[xh].select_xh = (i+1).toString()
      this.data.comfirm_select = []
      this.data.comfirm_select.push(new_users[xh])
    }

    this.data.old_select = selected

    this.setData({
      users: new_users
    })



  },

  // 完成选择
  comfirm:function(){
    app.globalData.comfirm_select = this.data.comfirm_select

    wx.redirectTo({
      url: '../edit_zupu/edit_zupu',
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