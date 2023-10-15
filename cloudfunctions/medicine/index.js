// 云函数入口文件
// 帮助我们在云函数中操作 !!!数据库、存储以及调用其他云函数!!!
const cloud = require('wx-server-sdk')
const fs = require("fs")
// fs 写入？？？
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("云函数MedicineRemind！！！该吃药啦！！！");
  // let time = event.time.year + "年" +  event.time.month + "月" + event.time.day + "日"
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        // "touser": 'oDAXh5OQ5IS2C5V6ou6l_IMA06KY', // 用户的openid
        "touser": wxContext.OPENID, // 用户的openid
        "page": '../../miniprogram/pages/home/index',// 返回首页
        "lang": 'zh_CN',
        "data": {
            "name06" : {
              "value" : '张洛'
          },
            "thing07" : {
            "value" : '手工艺课程'
          }
        },
        "templateId": 'zHuVX7ResS45mkq1ZM2s3uvy0pFHMQGmic0GIncrs6E',
        "miniprogramState": 'developer'
      })
    console.log("进入云函数内部，发送订阅消息啦");
    // 返回结果 自动注入appid, openid, unionid=''
    return { result, event }
  } catch (err) 
  {
    return err
  }
}
//转换成消息模版所需要的格式，date xx年/xx月/xx日
function nowTime(date) {
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${[year, month, day].map(formatNumber).join('/')}`
}
