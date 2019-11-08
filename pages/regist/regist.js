// pages/regist/regist.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginBtnTxt: "注册",
    getSmsCodeBtnTxt: "获取验证码",
    loginBtnBgBgColor: "#ff9900",
    getSmsCodeBtnColor: "#ff9900",
    phoneNum: '',
    smsCodeDisabled: false,
  },
  formSubmit:function(e){
   var param = e.detail.value;
   this.mySubmit(param);
  },
  setPhoneNumber: function(e) {
    var value = e.detail.value;
    this.setData({
      phoneNum: value
    });

  },
  getSmsCode: function () {
    var phoneNum = this.data.phoneNum;
    var that = this;
    var count = 60;
    if (this.checkUserName(phoneNum)) {
      var si = setInterval(function () {
        if (count > 0) {
          count--;
          that.setData({
            getSmsCodeBtnTxt: count + ' s',
            getSmsCodeBtnColor: "#999",
            smsCodeDisabled: true
          });
        } else {
          that.setData({
            getSmsCodeBtnTxt: "获取验证码",
            getSmsCodeBtnColor: "#ff9900",
            smsCodeDisabled: false
          });
          count = 60;
          clearInterval(si);
        }
      }, 1000);
    }

  },
  checkUserName: function(param) {
    var phone = util.regexConfig().phone;
    var inputUserName = param.trim();
    if(phone.test(inputUserName)){
      return true;
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码',
      });
      return false;
    }
  },
  mySubmit:function(param){
    var flag = this.checkUserName(param.username) &&
    this.chekPassword(param);
    var that = this;
    if(flag){
      this.setregistData1();
      setTimeout(function(){
        wx.showModal({
          title: '成功',
          content: 'success',
          duration :1500,
        })
        that.setregistData2();
        that.redirectTo(param);
      });
    }
  },

 redirectTo:function(param){
  param = JSON.stringify(param);
  wx.redirectTo({
    url: '../main/index?parm='+param,
  });
 },
chekPassword:function(param){
  var userName = param.username.trim();
  var passWord = param.password.trim();
  if(passWord.length <=0){
    wx.showModal({
      title: '提示',
      showCancel:false,
      content: '请设置密码',
    });
    return false;
  }else if(passWord.length<6 || passWord.length>20){
    wx.showModal({
      title: '提示',
      showCancel:false,
      content: '密码长度为6-20位字符',
    });
    return false;
  }else{
    return true;
  }
},
setregistData1:function(){
setTimeout(function(){
  wx.showModal({
    title: '成功',
    content: 'success',
    duration:1500
  })
  that.setregistData2();
  that.redirectTo(param);
},2000);
},
setregistData2:function(){
  this.setData({
   registBtnTxt:"注册",
   registBtnBgBgColor: "#ff9900",
  });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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