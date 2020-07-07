import React, {Component} from 'react';
import {Redirect,Route,Switch} from 'react-router-dom'
import {Layout} from 'antd';

import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import Home from "../home/home";
import Category from "../category/category";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Product from "../product/product";

const {Footer, Sider, Content} = Layout;


/**
 * 后台管理的路由组件
 */
class Admin extends Component {
    render() {
        let user = memoryUtils.user;
        if (!user || !user._id) {
            //自动跳转到登陆
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight: '100%'}}>
                <Sider>
                    <LeftNav>

                    </LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:20,backgroundColor:"white"}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:"center",color:"gray"}}>推荐使用谷歌浏览器，可以获得更佳的使用体验哦</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;