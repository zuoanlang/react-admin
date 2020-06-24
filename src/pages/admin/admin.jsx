import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Layout} from 'antd';

import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
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
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav>

                    </LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:"white"}}>Content</Content>
                    <Footer style={{textAlign:"center",color:"gray"}}>推荐使用谷歌浏览器，可以获得更佳的使用体验哦</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;