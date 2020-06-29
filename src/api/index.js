import ajax from "./ajax";

// 1.登录接口
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 2.添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', {user}, 'POST')

// 3.获取分类列表
export const reqCategories = (parentId) => ajax('/manage/category/list', {parentId})

// 4.添加分类
export const reqAddCategory = (categoryName,parentId) => ajax('/manage/category/add', {categoryName,parentId},'POST')

// 5.更新分类
export const reqUpdateCategory = ({categoryName,parentId}) => ajax('/manage/category/update', {categoryName,parentId},'POST')
