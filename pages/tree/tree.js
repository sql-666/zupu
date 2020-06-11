// pages/tree/tree.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
var that = this


function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var data1={
  }
  // var data1 = that.data.tree
  // var data1 = {
  //   "name": "梁洪(妻 王氏)",
  //   "children": [{
  //     "name": "梁辉耀(妻 李氏)",
  //     "children": [{
  //       "name": "梁明智(妻 徐氏)",
  //     }, {
  //         "name": "梁明佳(妻 梁氏)"
  //     }, {
  //         "name": "梁明优(妻 全氏)"
  //     }, {
  //         "name": "梁明冠(妻 王氏)"
  //     }]
  //   }, {
  //       "name": "梁辉安(妻 朱氏)",
  //     "children": [{
  //       "name": "梁明正(妻 李氏)"
  //     }, {
  //         "name": "梁明奔(妻 全氏)"
  //     }, {
  //       "name": "梁浦(妻 全氏)"
  //     }]
  //   }, {
  //       "name": "梁辉明(妻 黎氏)",
  //     "children": [{
  //       "name": "梁明亮(妻 李氏)"
  //     }]
  //   }, {
  //       "name": "梁辉佳(妻 王氏)",
  //     "children": [{
  //       "name": "梁明光(妻 岑氏)"
  //     }]
  //   },{
  //       "name":"梁辉炎(妻 万氏)",
  //       "children": [{
  //         "name": "梁明志(妻 岑氏)"
  //       }, { "name": "梁明连(妻 岑氏)"}
  //         , { "name": "梁明升(妻 岑氏)"}]
  //   }]
  // };


  var option = {
    series: [{
      type: 'tree',

      initialTreeDepth: -1,

      name: 'tree1',

      data: [data1],

      top: '5%',
      left: '20%',
      bottom: '2%',
      right: '15%',

      symbolSize: 10,
      symbol: 'circle',
      // lineStyle:{"color":'black'},

      label: {
        normal: {
          position: 'left',
          verticalAlign: 'bottom',
          align: 'right',
          color: 'black'
        }
      }

    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    tree :{
    "name": "始祖",
    "children": []
    },
    type:"init"
  },

  onLoad(options) {
    that = this
    that.data.id = options.id
    this.getData("init")

  },

  onReady() {
    this.oneComponent = this.selectComponent('#mychart-dom-area');
   
  },

  // 得到数据
  getData: function(type) {
    that = this
    wx.request({
      url: app.globalData.url + '/tree/',
      data: {
        "openid": app.globalData.openid,
        "id": that.data.id,
        "type": type
      },
      method: 'GET',
      success: function(res) {
        if (res.data.code == "200") {
          that.data.id = res.data.tree.myid
          that.init_one(res.data.tree)
        } else {
          wx.showToast({
            title: '无数据',
            image: '/static/warning.png'
          })
        }

      }
    })
  },

  init_one: function (data1) {           //初始化第一个图表
  //  var data1 = {
  //   "name": "梁洪(妻 王氏)",
  //   "children": [{
  //     "name": "梁辉耀(妻 李氏)",
  //     "children": [{
  //       "name": "梁明智(妻 徐氏)",
  //     }, {
  //         "name": "梁明佳(妻 梁氏)"
  //     }, {
  //         "name": "梁明优(妻 全氏)"
  //     }, {
  //         "name": "梁明冠(妻 王氏)"
  //     }]
  //   }, {
  //       "name": "梁辉安(妻 朱氏)",
  //     "children": [{
  //       "name": "梁明正(妻 李氏)"
  //     }, {
  //         "name": "梁明奔(妻 全氏)"
  //     }, {
  //       "name": "梁浦(妻 全氏)"
  //     }]
  //   }, {
  //       "name": "梁辉明(妻 黎氏)",
  //     "children": [{
  //       "name": "梁明亮(妻 李氏)"
  //     }]
  //   }, {
  //       "name": "梁辉佳(妻 王氏)",
  //     "children": [{
  //       "name": "梁明光(妻 岑氏)"
  //     }]
  //   },{
  //       "name":"梁辉炎(妻 万氏)",
  //       "children": [{
  //         "name": "梁明志(妻 岑氏)"
  //       }, { "name": "梁明连(妻 岑氏)"}
  //         , { "name": "梁明升(妻 岑氏)"}]
  //   }]
  // };
    var option = {
      series: [{
        type: 'tree',

        initialTreeDepth: -1,

        name: 'tree1',

        data: [data1],

        top: '5%',
        left: '20%',
        bottom: '2%',
        right: '15%',

        symbolSize: 10,
        symbol: 'circle',
        // lineStyle:{"color":'black'},

        label: {
          normal: {
            position: 'left',
            verticalAlign: 'bottom',
            align: 'right',
            color: 'black'
          }
        }

      }]
    }
    this.oneComponent = this.selectComponent('#mychart-dom-area');
    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(option)
      this.chart = chart;
      return chart;
    });
  }  ,

  // 翻页
  pager:function(e){
    var type=e.currentTarget.dataset.type
    
    this.getData(type)
  },

  // 人物信息
  info:function(e){
    wx.navigateTo({
      url: '../info/info',
    })
  }


});