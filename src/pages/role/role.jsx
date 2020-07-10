import React, {Component} from 'react';
import {Card, Button, Table} from 'antd'

/**
 * 角色路由
 */
class Role extends Component {

    state = {
        roles: [
            {
                name:'张三',
                create_time:'123',
                auth_time:'123',
                auth_name:'admin'
            },
            {
                name:'张三',
                create_time:'123',
                auth_time:'123',
                auth_name:'admin'
            },
            {
                name:'张三',
                create_time:'123',
                auth_time:'123',
                auth_name:'admin'
            }
        ],
        loading: false
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

    UNSAFE_componentWillMount(): void {
        this.initColumns()
    }


    render() {
        const {roles, loading} = this.state
        const title = (
            <span>
                <Button type='primary' style={{marginRight: 10}}>创建角色</Button>
                <Button type='primary' disabled>创建角色权限</Button>
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
                        type:'radio'
                    }}
                />
            </Card>
        );
    }
}

export default Role;