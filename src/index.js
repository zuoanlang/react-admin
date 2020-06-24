// 入口js



import React from 'react';
import ReactDOM from 'react-dom'

import App from "./App";

import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

//读取本地local的user
let user = storageUtils.getUser();
memoryUtils.user = user


// 渲染
ReactDOM.render(<App/>,document.getElementById('root'))