
import ajax from "./ajax";

// 1.登录接口
export const reqLogin =(username, password) => ajax('/login',{username,password},'POST')

//添加用户
export const reqAddUser =(user) => ajax('/manage/user/add',{user},'POST')
