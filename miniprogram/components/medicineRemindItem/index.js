// components/medicineRemindItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    medicineName: {
      type: String,
      value: "开发中..."
    },
    color: {
      type: String,
      value: "#F0763E"
    },
    // url: {
    //   type: String,
    //   value: "../../pages/home/index.js"
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeList:["09:30","10:10","13:90","18:30"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 测试调用 云函数
    navMedicineToFuncPage(){
      console.log("navHomeToFuncPage!!!");
      // wx.navigateTo({
      //   url: this.data.url,
      // })
////////////////// 
      // 调用 云函数
      wx.cloud.callFunction({
        // 云函数名称
        name: 'medicine',
        // 传给云函数的参数 event
        data: {
          // medicineName: undefined,
          // time: 
          // {
          //   year: undefined,
          //   month: undefined,
          //   day: undefined
          // },
          // dose: undefined,
          // advice: undefined,
          // circleDDL: undefined, // 2019年10月1日
          content: "你好，我是张洛^_^",
          a: 1,
          b: 1
        },
        success: function(res) {
          // 云函数返回数据 在res.result对象中
          wx.showToast({
            title: '云函数调用发送模板成功',
          })
          console.log("云函数返回数据 在res.result对象中", res) // 3
        },
        fail: console.error
      })
//////////////////
    },

    onSwitchMedicineTime(){
      //点击导致 checked 改变时会触发 change 事件，event.detail={ value}
      console.log("onSwitchMedicineTime!!!");
    },
    changeTime(){
      console.log("changeTime!!!");
      wx.getSetting({
        withSubscriptions:true,
        success:res=>{
          console.log("订阅消息", res.subscriptionsSetting)
          console.log("订阅消息总开关" ,res.subscriptionsSetting.mainSwitch)
          console.log("关于用户对提醒模版id的授权是否为接受", res.subscriptionsSetting.itemSettings)
          // 订阅消息里面的itemSettings属性是否为空
          if(res.subscriptionsSetting.itemSettings==null)
            this.requestSubscribeMessage()
          else{
            //关于用户对提醒模版id的授权是否为接受
            if (res.subscriptionsSetting.itemSettings["zHuVX7ResS45mkq1ZM2s3uvy0pFHMQGmic0GIncrs6E"]=='accept')  {
              wx.showToast({
                title: '用户点击了“总是保持以上，不再询问',
              })
            } else {
              wx.showToast({
                title: '用户没有点击“总是保持以上，不再询问',
              })
              console.log('用户没有点击“总是保持以上，不再询问”,每次都会调起授权页面')
              this.requestSubscribeMessage()
            }
          }
        }
      })
      // 先判断是否订阅消息，后进入setMedicineTime page
      // wx.navigateTo({
      //   url: ''
      // })
    },
    //获取订阅消息授权 （ 在changeTime中调用 ）
    requestSubscribeMessage(){
      console.log("requestSubscribeMessage函数");
      wx.requestSubscribeMessage({
        tmplIds: ["zHuVX7ResS45mkq1ZM2s3uvy0pFHMQGmic0GIncrs6E"],
        success:res=>{
          console.log("订阅消息",res)
        },
        fail:err=>{
          wx.showToast({
            title: "出错了TT"
          })
          console.log("订阅消息失败",err)
        }
      })
    },
  }
})
