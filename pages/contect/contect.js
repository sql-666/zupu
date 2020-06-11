// pages/people_list/people_list.js
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: [{ name: "ee", select_xh: "", gender: "1", myid: "11" }, { name: "osd", select_xh: "", gender: "2", myid: "22" }],
    xh: 0,
    old_select: [],
    comfirm_select: [],
    contect:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.zupu_id = options.zupu_id
    this .data.dai = options.id
    this.get_users()
  },
  // 获得人数
  get_users: function () {
    that = this
    wx.request({
      url: app.globalData.url + '/r_users/',
      data: {
        "openid": app.globalData.openid
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

  //选中的人员
  selected: function (e) {
    console.log(e)
    that.data.contect = e.detail.value
    

  },

  // 完成选择
  comfirm: function () {
    var that = this
    wx.request({
      url: app.globalData.url +'/zupu_connet/',
      data: {
        "zupu_id": that.data.zupu_id,
        "user_id": that.data.contect,
        "openid": app.globalData.openid
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code=="200"){
          wx.showToast({
            title: '指定成功',
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '../edit_zupu/edit_zupu?id=' + that.data.dai
            })
          },1500)

        }else{
          wx.showToast({
            image:'/static/warning.png',
            title: '勿重复指定!',
          })
        }
      },
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