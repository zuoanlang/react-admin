import React, {Component} from 'react';
import {Form, Icon, Input, Button, message} from 'antd';

import {reqLogin} from '../../api/'

import './login.less'

import logo from './images/logo.png'

const Item = Form.Item;

/**
 *登录路由组件
 */
class Login extends Component {


    handleSubmit = (event) => {
        event.preventDefault()
        let form = this.props.form;
        let values = form.getFieldsValue();
        console.log(values)
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //
                const {username, password} = values;
                const result = await reqLogin(username, password);
                console.log("request:",result)
                if (result.status === 0) {
                    message.success('登陆成功')
                    // 跳转管理界面
                    this.props.history.replace('/')
                } else {
                    message.error(result.msg)
                }
                // console.log('请求成功',response.data)
            } else {
                console.log("校验失败")
            }
        })
    }

    validatePwd = (rule, value, callback) => {
        console.log('validatePwd', rule, value)
        if (!value) {
            callback('密码必须输入')
        } else if (value.length < 4) {
            callback('密码最少4位')
        } else if (value.length > 12) {
            callback('密码最多4位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('数字字母下划线')
        } else {
            callback()
        }
    }

    render() {
        // const form = this.props.form
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='login'>
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        {required: true, whiteSpace: true, message: '用户名必须输入'},
                                        {min: 4, message: '用户名最少4位'},
                                        {max: 12, message: '用户名最多12位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '数字字母下划线'},
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            validator: this.validatePwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }

                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        );
    }


}

/**
 * 包装Form组件生成一个新的组件
 * 新组建会向Form传递一个强大的对象属性：form
 *
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin;