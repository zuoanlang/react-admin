import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Tree
} from 'antd'

const Item = Form.Item;
const {TreeNode} = Tree;

class AuthForm extends Component {

    static propTypes = {
        role: PropTypes.object
    }

    render() {
        const {role} = this.props
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };

        return (
            <Form {...formItemLayout}>
                <Item label='角色名称'>
                    <Input placeholder='请输入角色名称' value={role.name} disabled/>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                >
                    <TreeNode title="平台权限" key="all">
                        <TreeNode title="parent 1-0" key="0-0-0" disabled>
                            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox/>
                            <TreeNode title="leaf" key="0-0-0-1"/>
                        </TreeNode>
                        <TreeNode title="parent 1-1" key="0-0-1">
                            <TreeNode title={<span style={{color: '#1890ff'}}>sss</span>} key="0-0-1-0"/>
                        </TreeNode>
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}

export default Form.create()(AuthForm);