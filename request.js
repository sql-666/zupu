var base = require('conf.js')
var request = new Object();

// request.register = function () {
//   wx.login({
//     success: function (res) {
//       // console.log(res);
//       if (res.code) {
//         var code = res.code;
//         wx.setStorageSync('access_code', code);
//         wx.getUserInfo({
//           success: function (res) {
//             var userInfo = res.userInfo;
//             userInfo.code = code;
//             wx.request({
//               url: base.url + 'get_code',
//               data: userInfo,
//               method: "POST",
//               header: { "Content-Type": "application/x-www-form-urlencoded" },
//               success: function (res) {
//                 if (res.statusCode == 200 && res.data.msg == 'success') {
//                   console.log(res);
//                   wx.setStorageSync('openid', res.data.data);
//                 } else {
//                   console.log(res);
//                   wx.showToast({
//                     title: res.data.msg,
//                     image: "../../images/Unsuccessful.png",
//                   });
//                 }
//               }
//             })
//           }
//         })    
//       }
//     }
//   })
// }

/**
 * 0.2.0 前使用
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
request.wxRequest = function (obj) {
  var openid = wx.getStorageSync('openid');
  var openid = "aa"
  wx.request({
    url: base.url + obj.url + '&openid=' + openid,
    data: obj.data,
    method: obj.method,
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200 && res.data.msg == 'success') {
        typeof (obj.success) == 'function' && obj.success(res.data.data);
      } else {
        typeof (obj.fail) == 'function' && obj.fail(res.data.msg);
      }
    }
  })
}

/**
 * 0.2.0 以后版本、提交数据请求使用此接口
 * 检查是否登录
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 * @author peizebin@foxmail.com
 */
request.wxAsk = function (obj) {
  var openid = wx.getStorageSync('openid');
  wx.request({
    url: base.url + obj.url + '&openid=' + openid,
    data: obj.data,
    method: obj.method,
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200 && res.data.msg == 'success') {
        typeof (obj.success) == 'function' && obj.success(res.data);
      } else {
        typeof (obj.fail) == 'function' && obj.fail(res.data.msg);
      }
    }
  })
}
module.exports = request;