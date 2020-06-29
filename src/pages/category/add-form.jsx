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
        categories: PropTypes.array.isRequired
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: '0'
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                <Option value='1'>电脑</Option>
                                <Option value='2'>图书</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName')(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>


            </Form>
        );
    }
}

export default Form.create()(AddForm);