import React, {Component} from 'react';

import {
    Card,
    Button,
    Select,
    Input,
    Icon,
    Table, message
} from 'antd'
import {reqProducts, reqSearchProducts, reqUpdateStatus} from "../../api";
import {PAGE_SIZE} from '../../utils/constants'


const Option = Select.Option

/**
 * product的默认子路由
 */
class ProductHome extends Component {

    state = {
        total: 0,
        products: [],
        loading: false,
        searchName: '',//搜索的关键字
        searchType: 'searchName'//根据哪个字段搜索
    };

    /**
     * 初始化渲染 之前
     * @constructor
     */
    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    /**
     * 初始话渲染 之后
     * 加载数据
     */
    componentDidMount() {
        this.getProducts(1)
    }

    getProducts = async (pageNum) => {
        // 保存pageNum
        this.pageNum = pageNum
        // 显示loading
        this.setState({loading: true});
        const {searchName, searchType} = this.state;
        let result;
        if (searchName) {
            // 查找检索分页
            result = await reqSearchProducts({pageSize: PAGE_SIZE, pageNum, searchName, searchType});
        } else {
            // 普通检索分页
            result = await reqProducts(pageNum, PAGE_SIZE);
        }
        this.setState({loading: false})

        if (result.status === 0) {
            const {total, list} = result.data;
            this.setState({
                total,
                products: list
            })
        }

    }

    updateStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status);
        if (result.status === 0) {
            message.success('更新商品状态')
            this.getProducts(this.pageNum)
        }
    }

    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '¥' + price
            },
            {
                title: '状态',
                // dataIndex: 'status',
                render: (product) => {
                    const {status, _id} = product
                    return (
                        <span>
                            <Button
                                type='link'
                                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}>
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            {/*通过state将product传递过去*/}
                            <Button type='link'
                                    onClick={() => this.props.history.push('/product/detail', {product})}>详情</Button>
                            <Button type='link'
                                onClick={()=>this.props.history.push('/product/addUpdate',{product})}>修改</Button>
                        </span>
                    )
                }
            }
        ]
    }


    render() {
        const {products, total, loading, searchName, searchType} = this.state
        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{width: 150}}
                    onChange={value => this.setState({
                        searchType: value
                    })}
                >
                    <Option value='searchName'>按名称搜索</Option>
                    <Option value='searchDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{width: 150, margin: '0 15px'}}
                    value={searchName}
                    onChange={event => this.setState({
                        searchName: event.target.value
                    })}
                />
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={()=>this.props.history.push('/product/addUpdate',{})}>
                <Icon type='plus'/>
                添加商品
            </Button>
        )


        return (
            <Card title={title} extra={extra}>
                <Table
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                    bordered
                    loading={loading}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        );
    }


}

export default ProductHome;