import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Tree
} from 'antd'

import menuList from "../../config/menuConfig";

const Item = Form.Item;
const {TreeNode} = Tree;

class AuthForm extends Component {


    static propTypes = {
        role: PropTypes.object
    }

    constructor(props) {
        super(props);
        // 根据传入角色的menus生成初始状态
        const {menus} = this.props.role
        this.state = {
            checkedKeys: menus
        }
    }


    /**
     *
     */
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }

    /**
     * 勾选中事件
     */
    onCheck = checkedKeys => {
        console.log('onClick', checkedKeys)
        this.setState({
            checkedKeys
        })
    }
    /**
     *
     * @constructor
     */
    UNSAFE_componentWillMount = () => {
        this.treeNodes = this.getTreeNodes(menuList)
    }

    render() {
        const {role} = this.props
        const {checkedKeys} = this.state
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
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}

export default Form.create()(AuthForm);