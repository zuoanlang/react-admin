import React, {Component} from 'react';
import {
    Card,
    Table,
    Button,
    Modal,
    Icon, message
} from 'antd'

import {reqCategories, reqUpdateCategory, reqAddCategory} from '../../api'
import AddForm from "./add-form";
import UpdateForm from "./update-form";

/**
 * 首页路由
 */
class Category extends Component {
    state = {
        loading: false,
        categories: [],
        subCategories: [],
        parentId: '0',
        parentName: '',//当前需要显示的分类列表的父分类名称
        // 0.都不显示1.显示添加2.显示修改
        showStatus: 0
    }

    /**
     * 初始化table所有的列
     */
    initTableColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <Button type='link' onClick={() => {
                            this.showUpdateCategory(category)
                        }}>修改分类</Button>
                        {/*向事件回调函数传递参数*/}
                        {
                            this.state.parentId === '0' ? <Button type='link'
                                                                  onClick={() => this.showSubCategories(category)}>查看子分类</Button> : null
                        }
                    </span>
                )
            }
        ];
    }

    /**
     * 显示一级分类列表
     * @param category
     */
    showSubCategories = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {//setState在状态更新且重新render()后执行
            // 获取分类列表
            this.getCategories()
        })
    }

    /**
     * 显示二级分类列表
     */
    showCategories = () => {
        // 一级列表显示
        this.setState({
            parentId: '0',
            parentName: '',
            subCategories: []
        })
    }

    // 显示添加对话框
    showAddCategory = () => {
        this.setState({
            showStatus: 1
        })
    }

    // 显示修改对话框
    showUpdateCategory = (category) => {
        // 保存分类对象
        this.category = category
        // 更新状态
        this.setState({
            showStatus: 2
        })
    }

    addCategory = () => {
        // 验证表单
        this.form.validateFields(async (err, values) => {
            if (!err) {
                // 1.隐藏确认框
                this.setState({
                    showStatus: 0
                })
                // 2.收集数据,并提交添加分类的请求
                const {parentId, categoryName} = values;
                // 清除数据
                this.form.resetFields()
                const result = await reqAddCategory(categoryName, parentId);
                if (result.status === 0) {
                    this.getCategories()
                }
            }
        })
    }

    updateCategory = () => {
        // 验证表单
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //1.隐藏确定框
                this.setState({
                    showStatus: 0
                })

                debugger
                const categoryId = this.category._id
                const {categoryName} = values;

                // 清除数据
                this.form.resetFields()
                //2.发请求更新分类
                const result = await reqUpdateCategory({categoryId, categoryName});
                if (result.status === 0) {
                    //3.重新显示列表
                    this.getCategories()

                }
            }
        })

    }

    // 关闭对话框
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
        // 清除数据
        this.form.resetFields()
    }


    UNSAFE_componentWillMount() {
        this.initTableColumns()
    }

    /**
     * 第一次render()发送请求
     */
    componentDidMount() {
        this.getCategories()
    }

    /**
     * 异步获取一级分类列表显示
     */
    getCategories = async () => {
        //显示loading
        this.setState({loading: true})
        // 取出当前需要获取的parentId
        const {parentId} = this.state
        let result = await reqCategories(parentId);
        this.setState({loading: false})
        if (result.status === 0) {
            // 取出分类数组
            const categories = result.data;
            // 可能是一级也可能是二级分类
            if (parentId === '0') {
                // 更新一级分类状态
                this.setState({
                    categories
                })
            } else {
                // 更新二级分类状态
                this.setState({
                    subCategories: categories
                })
            }

        } else {
            message.error("获取分类列表失败")
        }
    }

    render() {
        const extra = (
            <Button type='primary' onClick={this.showAddCategory}>
                <Icon type='plus'/>
                添加
            </Button>
        )

        // 如果还没有指定一个空对象
        const category = this.category || {}

        const {categories, loading, subCategories, parentId, parentName, showStatus} = this.state
        //card的右侧
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <Button type='link' onClick={this.showCategories}>一级分类列表</Button>
                <Icon type='arrow-right' style={{marginRight: 5}}/>
                <span>{parentName}</span>
            </span>
        )


        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        bordered
                        rowKey='_id'
                        dataSource={parentId === '0' ? categories : subCategories}
                        columns={this.columns}
                        loading={loading}
                        pagination={{
                            defaultPageSize: 5,
                            showQuickJumper: true
                        }}
                    />
                </Card>
                {/*新增*/}
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        categories={categories}
                        parentId={parentId}
                        setForm={(form) => {
                            this.form = form
                        }}
                    />
                </Modal>
                {/*修改*/}
                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm categoryName={category.name} setForm={(form) => {
                        this.form = form
                    }}/>
                </Modal>
            </div>
        );
    }


}

export default Category;