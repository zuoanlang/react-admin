import axios from 'axios'
import {message} from 'antd'

function ajax(url, data = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        // 1.异步执行ajax
        let promise;

        if (type === "GET") {
            promise = axios.get(url, {
                params: data
            });
        } else {
            // 发送post请求
            promise = axios.post(url, data)
        }
        // 2.success
        promise.then(response => {
            resolve(response.data)

        }).catch(error => {
            // 3.failed
            message.error('请求出错了：'+error.message)
        })
    })

}

export default ajax;