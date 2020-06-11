//app.js
var request = require('request.js');
App({
  onLaunch: function () {
    this.request = request;
  },

  // 格式要求
  table: function(value) {
  var  table = {
      "account": {
        "empty": false,
        "len": 11,
        "con": ""
      },
      "password": {
        "empty": false,
        "len": 16,
        "con": ""
      }
    }
    return table[value]
  },


  // 验证输入的格式
  dataFormat: function(value) {
    var that = this
    var type_command = that.table(value)
    console.log(value)
    if (!type_command){
      return false
    }
    console.log("1")
    if (!type_command.empty){
      if (!value){
        return false
      }
    }
    console.log("2")
    if (value.length > type_command.len || !value) {
        return false
    }
    console.log("3")
    if (type_command.con){
      return false
    }
    console.log("4")
    return true
  },

  // 网络请求
  request:function(){
    
  },

  showModal: function (that) {
    var animation = wx.createAnimation({
      duration: 200,
    })
    animation.opacity(0).rotateX(-100).step();
    that.setData({
      // animationData:animation.width('291px'),
      animationData: animation.export()
    });
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      that.setData({
        animationData: animation
      });
    }.bind(that), 200)
  },

  globalData: {
    userInfo: null,
    comfirm_select:[],
    openid:"6e0036d0716d3f528f46d86d5ac4e2ff",
    url:'http://127.0.0.1:8000/myapp'

  }
})