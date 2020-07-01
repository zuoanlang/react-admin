import React, {Component} from 'react';
import {
    Button,
    Card,
    Form,
    Icon,
    Input, message,
    Upload,
    Cascader
} from 'antd'
import {reqCategories} from "../../api";

const Item = Form.Item
const {TextArea} = Input

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
];

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
    initOptions = (categories) => {
        //categories -> options
        const options = categories.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }));
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

        }
        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            this.setState({
                options: [...this.state.options],
            });
        }, 1000);
    };

    /**
     * 渲染结束初始化
     */
    componentDidMount() {
        this.getCategories(0)
    }

    render() {
        const title = (
            <span>
                <Button type='link' onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{marginRight: 15, color: 'green', fontSize: 18}}/>
                </Button>
                <span>添加商品</span>
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
                                initialValue: '',
                                rules: [
                                    {required: true, message: '请输入商品名称'}
                                ]
                            })(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('desc', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '请输入商品描述'}
                                ]
                            })(<TextArea placeholder='请输入商品描述' autoSize={{minRows: 2, maxRows: 6}}/>)
                        }
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('price', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '请输入商品价格'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
                        }

                    </Item>
                    <Item label='商品分类'>
                        {
                            getFieldDecorator('type', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '请输入商品价格'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                            />)
                        }

                    </Item>
                    <Item label='商品图片'>
                        <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>
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