import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {

    static propTypes = {
        // 用来传递form对象的函数
        setForm: PropTypes.func.isRequired,
        //一级分类的数组
        categories: PropTypes.array.isRequired,
        //父分类的ID
        parentId: PropTypes.string.isRequired
    }

    UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const {categories, parentId} = this.props
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: parentId
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                {
                                    categories.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: '',
                            rules: [
                                {
                                    required:true,
                                    message:'分类名称必须输入'
                                }
                            ]
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>


            </Form>
        );
    }
}

export default Form.create()(AddForm);