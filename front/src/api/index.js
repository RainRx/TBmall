import http from './public'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/user/login', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchPost('/member/loginOut', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchPost('/member/checkLogin', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost('/user/register', params)
}

// 更新用户信息
export const updateInfo = (params) => {
  return http.fetchPost('/user/updateInfo', params)
}

// 上传图片
export const upload = (params) => {
  return http.fetchPost('/member/imgaeUpload', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost('/member/updateheadimage', params)
}
// 捐赠列表
export const thanksList = (params) => {
  return http.fetchPost('/member/thanks', params)
}
// 首页接口
export const productHome = (params) => {
  return http.fetchPost('/goods/home', params)
}
// 首页接口
export const navList = (params) => {
  return http.fetchPost('/goods/navList', params)
}
// 推荐板块
export const recommend = (params) => {
  return http.fetchPost('/goods/recommend', params)
}
// 捐赠板块
export const thank = (params) => {
  return http.fetchPost('/goods/thank', params)
}
// 极验验证码
export const geetest = (params) => {
  return http.fetchPost('/member/geetestInit?t=' + (new Date()).getTime(), params)
}

export const test = (params) => {
  return http.fetchPost('/user/test', params)
}
