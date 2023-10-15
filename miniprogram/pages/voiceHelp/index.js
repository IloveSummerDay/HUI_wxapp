// pages/voiceHelp/index.js
let recorderManager = wx.getRecorderManager()
let userVoice = undefined
let botVoice = undefined
recorderManager.onStart(() => {
  console.log('录音开始了')
})
recorderManager.onStop((res) => {
  console.log('录音结束了', res)
  const { tempFilePath } = res
  console.log("音频文件tempFilePath", tempFilePath);
  // 上传tempFilePath ---> node
  wx.uploadFile({
    filePath: tempFilePath,
    name: 'wx_userVoice',
    url: 'http://localhost:3000/index', // post
    // url: 'http://localhost:3000/voiceHelp', // post
    success(res){
      console.log("上传tempFilePath ---> node成功！ 返回数据为\n", res.data);
    },
    fail(err){
      console.log("上传tempFilePath ---> node失败！" ,err);
    }
  })
})
////////////////////////////////////
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touch: false,
    userVoice: userVoice,
    botVoice: botVoice,
    chatList: [
      {
        classIndex: "answer",
        content: "您好，我是您的智能语音助手小安（随便取的名字），欢迎使用下方语音功能向我提问哦~"
      },
      {
        classIndex: "question",
        content: "可以唱首歌给我听吗?"
      },
      {
        classIndex: "question",
        content: "您好，我是您的智能语音助手小安（随便取的名字），欢迎使用下方语音功能向我提问哦~"
      },
      {
        classIndex: "answer",
        content: "我"
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("012345678".slice(6));
  },
  /**
   * 监听用户说话
   */
  sayStart(){
    console.log("sayStart");
    this.setData({
      touch:true
    })
    // 屏幕亮度降低
    wx.setScreenBrightness({
      value: 0.5,
      success(){
        console.log("屏幕变暗了");
      }
    })
    // 开始录音
    recorderManager.start({
      format: "PCM"
    })
  },
  sayEnd(){
    console.log("sayEnd");
    this.setData({
      touch: false
    })
    // 屏幕亮度加强
    wx.setScreenBrightness({
      value: 1,
      success(){
        console.log("屏幕恢复亮度");
      }
    })
    // 结束录音
    recorderManager.stop()
  },

})