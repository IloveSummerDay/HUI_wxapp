// components/homeItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: "开发中..."
    },
    color: {
      type: String,
      value: "#EB5252"
    },
    url: {
      type: String,
      value: "../../pages/home/index.js"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    test: "用药提醒"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navHomeToFuncPage(){
      console.log("navHomeToFuncPage");
      wx.navigateTo({
        url: this.data.url,
      })
    }
  }
})
