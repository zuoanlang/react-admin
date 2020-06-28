import React, {Component} from 'react';
import './index.less'

import logo from '../../assets/images/logo.png'
import {Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';
import menuList from "../../config/menuConfig";

const {SubMenu} = Menu;

/**
 * 左侧导航栏
 */
class LeftNav extends Component {

    //map + 递归
    // getMenuNodes = (menuList) => {
    //     return menuList.map(item => {
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon}/>
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         } else {
    //             return (
    //                 <SubMenu
    //                     key={item.key}
    //                     title={
    //                         <span>
    //                             <Icon type={item.icon}/>
    //                             <span>{item.title}</span>
    //                         </span>
    //                     }
    //                 >
    //                     {
    //                         this.getMenuNodes(item.children)
    //                     }
    //                 </SubMenu>
    //             )
    //         }
    //
    //     })
    // }

    // reduce + 递归
    getMenuNodes = (menuList) => {
        // 得到当前请求的路由组件
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            // 想pre中添加<Menu.Item>
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {
                // 查找与当前请求路径匹配的item
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    this.openKey = item.key
                }
                // 想pre中添加<SubMenu.Item>
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }

    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        // 得到当前请求的路由组件
        const path = this.props.location.pathname
        const openKey = this.openKey
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>后台管理</h1>
                </Link>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        );
    }
}

/**
 * 高阶组件
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递三个属性：history、location、match
 *
 */
export default withRouter(LeftNav);