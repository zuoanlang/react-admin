import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import menuList from "../../config/menuConfig";
import './index.less'
import storageUtils from "../../utils/storageUtils";

import {Modal} from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import Button from "antd/es/button";

const {confirm} = Modal;

class Header extends Component {

    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        console.log(path)
        menuList.forEach(item => {
                if (item.key === path) {
                    title = item.title
                } else if (item.children) {
                    let cItem = item.children.find(cItem => cItem.key === path);
                    if (cItem) {
                        title = cItem.title
                    }
                }
            }
        )
        return title;
    }

    /**
     * 退出登录
     */
    logout = () => {
        confirm({
            content: '确认退出吗？',
            onOk:()=> {
                // 删除数据
                storageUtils.deleteUser()
                memoryUtils.user={}
                // 跳转登录界面
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    render() {
        let title = this.getTitle();

        return (
            <div className='header'>
                <div className="header-top">
                    <span>欢迎，admin</span>
                    <Button type="link" onClick={this.logout}>
                        退出
                    </Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">2020-06-27 01:51</div>
                    <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
                    <span>晴</span>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);