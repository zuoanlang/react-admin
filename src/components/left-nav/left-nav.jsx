import React, {Component} from 'react';
import './index.less'

import logo from '../../assets/images/logo.png'

/**
 * 左侧导航栏
 */
class LeftNav extends Component {
    render() {
        return (
            <div className='left-nav'>
                <header className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>后台管理</h1>
                </header>

            </div>
        );
    }
}

export default LeftNav;