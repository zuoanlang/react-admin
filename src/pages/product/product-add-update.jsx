import React, {Component} from 'react';
import {Button, Card, Cascader, Form, Icon, Input, message} from 'antd'
import {reqCategories} from "../../api";
import PicturesWall from "./pictures-wall";

const Item = Form.Item
const {TextArea} = Input


/**
 * product的添加和更新子路由
 */
class ProductAddUpdate extends Component {

    state = {
        options: []
    }

    submit = () => {
        // 表单验证
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                message.success("success")
            }
        })
    }

    /**
     * 获取商品分类
     * @param parentId
     * @returns {Promise<void>}
     */
    getCategories = async (parentId) => {
        const result = await reqCategories(parentId);
        if (result.status === 0) {
            const categories = result.data;
            if (parentId === 0) {
                // 判断一级分类列表
                this.initOptions(categories)
            } else {
                //返回二级列表
                //当前async函数返回的promise就会成功且value为categories
                return categories
            }
        }


    }

    /**
     * 初始化商品分类下拉列表
     * @param categories
     */
    initOptions = async (categories) => {
        //categories -> options
        const options = categories.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }));
        const {isUpdate, product} = this
        const {pCategoryId} = product

        if (isUpdate && pCategoryId !== '0') {
            //获取对应的二级分类列表
            const subCategories = await this.getCategories(pCategoryId);
            // 生成二级的option
            const childrenOption = subCategories.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }));
            //找到对应的一级option对象
            const targetOption = options.find(option => option.value === pCategoryId);
            //拼接二级目录
            targetOption.children = childrenOption;
        }
        // 更新状态
        this.setState({
            options
        })
    }

    /**
     * 验证价格的函数
     * @param rule
     * @param value 参数值
     * @param callback 回调函数
     */
    validatePrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback()
        } else {
            callback('价格必须大于0')
        }
    }
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;

        const subCategories = await this.getCategories(targetOption.value)
        if (subCategories && subCategories.length > 0) {
            // 关联当前的option上
            targetOption.children = subCategories.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }));
        } else {
            // 当前选中分类没有二级分类
            targetOption.isLeaf = true
        }
        targetOption.loading = false;
        // 更新options状态
        this.setState({
            options: [...this.state.options]
        })

    };

    /**
     * 渲染结束初始化
     */
    componentDidMount() {
        this.getCategories(0)
    }

    /**
     * 第一次渲染之前
     * @constructor
     */
    UNSAFE_componentWillMount() {
        // get product,可能没有
        const {product} = this.props.location.state;
        // update case 标识
        this.isUpdate = !!product
        // 保存product
        this.product = product || {}
    }

    render() {
        const {isUpdate, product} = this;
        const {pCategoryId, categoryId} = product
        const categoryIds = []
        if (isUpdate) {
            if (pCategoryId === 0) {
                categoryIds.push(categoryId)
            } else {
                // 二级分类
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }

        const title = (
            <span>
                <Button type='link' onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{marginRight: 15, color: 'green', fontSize: 18}}/>
                </Button>
                <span>{isUpdate ? '修改商品' : '新增商品'}</span>
            </span>
        )
        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 8},
        };

        const {getFieldDecorator} = this.props.form
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('name', {
                                initialValue: product.name,
                                rules: [
                                    {required: true, message: '请输入商品名称'}
                                ]
                            })(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('desc', {
                                initialValue: product.desc,
                                rules: [
                                    {required: true, message: '请输入商品描述'}
                                ]
                            })(<TextArea placeholder='请输入商品描述' autoSize={{minRows: 2, maxRows: 6}}/>)
                        }
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('price', {
                                initialValue: product.price,
                                rules: [
                                    {required: true, message: '请输入商品价格'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
                        }

                    </Item>
                    <Item label='商品分类'>
                        {
                            getFieldDecorator('categoryIds', {
                                initialValue: categoryIds,
                                rules: [
                                    {required: true, message: '请选择商品分类'},
                                ]
                            })(<Cascader
                                placeholder='请选择商品分类'
                                options={this.state.options}
                                loadData={this.loadData}
                            />)
                        }

                    </Item>
                    <Item label='商品图片'>
                        <PicturesWall/>
                    </Item>
                    <Item label='商品详情'>
                        <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        );
    }


}

export default Form.create()(ProductAddUpdate);