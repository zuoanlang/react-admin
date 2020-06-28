const menuList = [
    {
        title: '首页', //菜 单 标 题 名 称
        key: '/home', //对 应 的 path
        icon: 'home', //图 标 名 称
    },
    {
        // 子 菜 单 列 表
        title: '商品', key: '/products', icon: 'appstore', children: [
            {title: '品类管理', key: '/category', icon: 'bars'},
            {title: '商品管理', key: '/product', icon: 'tool'},
        ]
    },
    {
        title: '用户管理', key: '/user', icon: 'user'
    },
    {
        title: '角色管理', key: '/role', icon: 'safety',
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: 'area-chart',
        children: [{title: '柱形图', key: '/charts/bar', icon: 'bar-chart'}, {
            title: '折线图',
            key: '/charts/line',
            icon: 'line-chart'
        }, {title: '饼图', key: '/charts/pie', icon: 'pie-chart'},]
    }
]
export default menuList