import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd'
import {reqAddRoles, reqRoles} from "../../api";
import AddForm from "./add-form";

/**
 * 角色路由
 */
class Role extends Component {

    state = {
        roles: [],
        loading: false,
        role: {},
        isShowAdd: false
    }

    /**
     * 初始化Columns
     */
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            },
        ]
    }

    /**
     * 获取角色
     */
    getRoles = async () => {
        const result = await reqRoles();
        if (result.status === 0) {
            const roles = result.data;
            this.setState({
                roles
            })
        }
    }


    onRow = (role) => {
        return {
            onClick: event => {
                console.log(role)
            }// 点击行

        };
    }
    /**
     *角色
     */
    addRole = () => {
        // 表单验证，通过了向下处理
        this.form.validateFields((async (errors, values) => {
            if (!errors) {
                // 1.收集输入数据
                const {roleName} = values
                // 重置表单
                this.form.resetFields()
                // 2.请求添加
                const result = await reqAddRoles({roleName});
                // 3.根据结果提示、更新列表显示
                if (result.status === 0) {
                    // 隐藏确认框
                    this.setState({
                        isShowAdd: false
                    })
                    //success
                    message.success('添加角色成功')
                    // 刷新列表
                    // 方式一：重新请求
                    // 方式二：将数据添加到前端列表中
                    // 1.取出数据
                    // react 不建议直接跟新状态对象，建议新产生一个数组去更新状态
                    // const roles = this.state.roles;
                    const roles = [...this.state.roles];
                    // 2.新产生的角色
                    const role = result.data;
                    roles.push(role)
                    // 3.刷新列表
                    this.setState({
                        roles
                    })

                }

            }
        }))

    }


    UNSAFE_componentWillMount(): void {
        this.initColumns()
    }

    componentDidMount(): void {
        this.getRoles()
    }


    render() {
        const {roles, loading, role, isShowAdd} = this.state
        const title = (
            <span>
                <Button type='primary' style={{marginRight: 10}}
                        onClick={() => this.setState({isShowAdd: true})}>创建角色</Button>
                <Button type='primary' disabled={!role._id}>创建角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    loading={loading}
                    pagination={{
                        defaultPageSize: 5,
                        showQuickJumper: true
                    }}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id]
                    }}
                    onRow={this.onRow}
                />
                {/*新增*/}
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({isShowAdd: false})
                        this.form.resetFields()
                    }}
                >
                    <AddForm
                        setForm={(form) => {
                            this.form = form
                        }}
                    />
                </Modal>
            </Card>
        );
    }
}

export default Role;