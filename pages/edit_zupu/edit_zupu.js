// pages/edit_zupu/edit_zupu.js
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zupu_part: [],
    dai: 0,
    page: 1,
    showModalStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.drive = app.globalData
    this.setData({
      dai: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.get_zupu_part()
  },

  // 添加/删除人员
  edit_people: function(type) {
    that = this

    var data = {
      "name": that.data.name,
      "fid": that.data.currentBtn,
      "type": type,
      "openid": that.data.drive.openid,
      "dai": that.data.dai
    }
    wx.request({
      url: that.data.drive.url + '/zupu_part/',
      data: data,
      method: 'POST',
      success: function(res) {
        if (res.data.code == "200") {
          that.get_zupu_part()
          wx.showToast({
            title: '提交成功'
          })
        }

      }
    })
  },

  // 获取新增名字
  name: function(e) {
    that = this
    that.data.name = e.detail.value
  },


  // 遮罩
  showModal: function(e) {
    var showModalStatus = e.currentTarget.dataset.statu == 'open' ? true : false;
    app.showModal(this);
    this.setData({
      showModalStatus: showModalStatus,
    })

    that.data.currentBtn = e.currentTarget.dataset.currentbtn
  },
  confirm: function(e) {
    var showModalStatus = e.currentTarget.dataset.statu == 'open' ? true : false;
    var type = e.currentTarget.dataset.type
    this.setData({
      showModalStatus: showModalStatus,
    })
    this.edit_people(type)

  },

  // 提交数据
  put_zupu_part: function(e) {
    that = this
    console.log(e)
    // that.delData(e.detail.value)
    var data = e.detail.value
    data["type"] = "edit"
    data["openid"] = that.data.drive.openid
    // data["page"] = that.data.page
    data["dai"] = that.data.dai
    wx.request({
      url: that.data.drive.url + '/zupu_part/',
      data: data,
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        if (res.data.code == "200") {
          that.get_zupu_part()
          wx.showToast({
            title: '提交成功'
          })

        }

      }
    })
  },

  // 获取该代
  get_zupu_part: function() {
    that = this
    wx.request({
      url: that.data.drive.url + '/zupu_part',
      data: {
        openid: that.data.drive.openid,
        page: that.data.page,
        dai: that.data.dai
      },
      method: 'GET',
      success: function(res) {
        var zupu_part = []

        that.setData({
          zupu_part: res.data.zupu_part
        })



      }
    })
  },

  // 删除人员
  del: function(e) {
    that = this
    var data = {
      "openid": that.data.drive.openid,
      "myid": e.currentTarget.dataset.myid,
      "type": e.currentTarget.dataset.type
    }
    wx.request({
      url: that.data.drive.url + '/zupu_part/',
      data: data,
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        if (res.data.code == "200") {
          that.get_zupu_part()
          wx.showToast({
            title: '删除成功'
          })

        }

      }
    })



  },

  // 添加人员
  add_people: function(e) {
    var data = e.currentTarget.dataset
    var type = data.type
    var new_part = this.data.zupu_part
    if (type == "father") {
      new_part.push({
        name: ""
      })
    } else {
      var xh = parseInt(data.xh)
      new_part[xh].children.push({
        name: ""
      })
    }
    this.setData({
      zupu_part: new_part
    })


  },

  // 指定人员
  connect: function(e) {
    var zupu_id = e.currentTarget.dataset.zupu_id
    var that = this
    wx.navigateTo({
      url: '../contect/contect?zupu_id=' + zupu_id+"&id="+that.data.dai,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})