import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductHome from "./product-home";
import ProductAddUpdate from "./product-add-update";
import ProductDetails from "./product-details";
import './product.less'
/**
 * 商品路由
 */
class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact/>
                <Route path='/product/addupdate' component={ProductAddUpdate}/>
                <Route path='/product/detail' component={ProductDetails}/>
                <Redirect to='/product'/>
            </Switch>
        );
    }
}

export default Product;