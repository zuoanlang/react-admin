import React from 'react';
import axios from 'axios'

function ajax(url,data={},type='GET') {
    if (type==="GET"){
        return axios.get(url,{
            params:data
        });
    } else {
        // 发送post请求
        return axios.post(url,data)
    }
}

export default ajax;