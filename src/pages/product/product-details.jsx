import React, {Component} from 'react';
import {
    Card,
    Icon,
    List,
    Button
} from 'antd'

import {BASE_IMG_URL} from '../../utils/constants'
import {reqCategory} from '../../api'

const Item = List.Item;

/**
 * product的详情子路由组件
 */
class ProductDetails extends Component {

    state = {
        // 一级分类名称
        cName1: '',
        // 二级分类名称
        cName2: ''
    }

    /**
     * 渲染完成后请求
     */
    async componentDidMount() {
        // 取出product中的分类id
        const {categoryId, pCategoryId} = this.props.location.state.product;
        if (pCategoryId === '0') {
            const result = await reqCategory(categoryId);
            this.setState({
                cName1: result.data.name
            })
        } else {
            // 效率问题
            // const result1 = await reqCategory(pCategoryId);
            // const result2 = await reqCategory(categoryId);
            // 一次性发多个请求
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
            this.setState({
                cName1: results[0].data.name,
                cName2: results[1].data.name,
            })
        }
    }

    render() {

        //读取传递过来的数据
        const {name, desc, price, detail, imgs} = this.props.location.state.product;
        debugger
        // 取出state中的数据
        const {cName1, cName2} = this.state

        const title = (
            <span>
                <Button type='link' onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{marginRight: 15, color: 'green', fontSize: 18}}/>
                </Button>
                <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title} className='product-detail'>
                <Item>
                    <span className="left">商品名称：</span>
                    {name}
                </Item>
                <Item>
                    <span className="left">商品描述：</span>
                    {desc}
                </Item>
                <Item>
                    <span className="left">商品价格：</span>
                    {price}
                </Item>
                <Item>
                    <span className="left">商品分类：</span>
                    {cName1} {cName2 ? '-> ' + cName2 : ''}
                </Item>
                <Item>
                    <span className="left">商品图片：</span>
                    <div>
                        {
                            imgs.map(
                                img => (
                                    <img
                                        key={img}
                                        src={BASE_IMG_URL + img}
                                        alt="img"
                                        className='product-img'
                                    />
                                )
                            )
                        }
                    </div>
                </Item>
                <Item>
                    <span className="left">商品详情：</span>
                    <span dangerouslySetInnerHTML={{__html: detail}}/>
                </Item>
            </Card>
        );
    }
}

export default ProductDetails;