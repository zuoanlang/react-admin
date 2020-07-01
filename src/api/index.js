import ajax from "./ajax";

// 1.登录接口
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 2.添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', {user}, 'POST')

// 3.获取分类列表
export const reqCategories = (parentId) => ajax('/manage/category/list', {parentId})

// 4.添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')

// 5.更新分类
export const reqUpdateCategory = ({categoryName, categoryId}) => ajax('/manage/category/update', {
    categoryName,
    categoryId
}, 'POST')

/**
 * 6.获取一个商品分类
 * @param categoryId 商品分类ID
 * @returns {Promise | Promise<unknown>}
 */
export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})

/**
 * 更新商品状态
 * @param productId 商品id
 * @param status 商品状态
 * @returns {Promise | Promise<unknown>}
 */
export const reqUpdateStatus = (productId, status) => ajax('/manage/category/updateStatus', {productId, status}, 'POST')

// 6.获取商品列表
export const reqProducts = (pageSize, pageNum) => ajax('/manage/product/list', {pageSize, pageNum})

// 7.搜索商品列表
export const reqSearchProducts = ({pageSize, pageNum, searchName, searchType}) => ajax('/manage/product/search', {
    pageSize,
    pageNum,
    [searchType]: searchName
})
