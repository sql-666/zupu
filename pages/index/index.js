const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    degs: 0,
    degss: 0,
    degsss: 0,
    subords: [],
    zupu:[]
  },

  onReady:function(){
    this.get_dai()
  },

  /**
   * 折叠展开动画
   */
  rotateAnim: function (e) {
    var that = this
    var deg = e.currentTarget.dataset.degs;
    var id = e.currentTarget.dataset.id
    deg = deg == 0 ? 90 : 0;
    var zupu = that.data.zupu
    zupu[id]["degs"] = deg
    that.setData({
      zupu: zupu
    })
  },

  // 编辑族谱架构
  edit_zupu:function(e){
    wx.navigateTo({
      url: '../edit_dai/edit_dai',
    })
  },

  // 跳转到可视化族谱
  toDraw: function (e) {
    wx.navigateTo({
      url: '../tree/tree?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    
  },

  // 获取族谱
  get_dai:function(e){
    that = this
    wx.request({
      url: app.globalData.url +'/zupu_dai/',
      data: {
        "openid": app.globalData.openid
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          zupu:res.data.zupu,
          flag:res.data.flag
        })
      },
    })
  }

})