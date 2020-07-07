import React, {Component} from 'react';
import {Upload, Icon, Modal, message} from 'antd';
import PropTypes from 'prop-types'
import {reDeleteImg} from '../../api'
import {BASE_IMG_URL} from "../../utils/constants";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends Component {

    static propTypes = {
        imgs: PropTypes.array
    }
    state = {
        //是否显示大图预览
        previewVisible: false,
        previewImage: '',
        fileList:[],
    };

    constructor(props) {
        super(props);

        let fileList = []
        // 初始化状态
        const {imgs} = this.props
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index,
                name: img,
                status: 'done',
                url: BASE_IMG_URL + img
            }))
        }
        this.state = {
            //是否显示大图预览
            previewVisible: false,
            previewImage: '',
            fileList,
        };
    }


    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    /**
     * 图片上传onchange事件
     * @param file
     * @param fileList
     */
    handleChange = async ({file, fileList}) => {

        // 一旦上传成功，将当前上传的file的信息修正（name，url）
        if (file.status === 'done') {
            const response = file.response;
            if (response.status === 0) {
                //上传成功
                message.success('上传图片成功  ')
                const {name, url} = response.data;
                file = fileList[fileList.length - 1];
                file.name = name;
                file.url = url;
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status === 'removed') {
            const result = await reDeleteImg(file.name);
            if (result.status === 0) {
                message.success('删除图片成功')
            } else {
                message.error('删除图片失败')
            }
        }

        //更新状态
        this.setState({
            fileList
        });

    }

    /**
     * 获取图片列表
     * @returns {*[]}
     */
    getImages = () => {
        return this.state.fileList.map(file => file.name)
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload"
                    accept='image/*'
                    name='image'
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

/**
 * 1.子组件调用父组件的方法
 *      将父组件的的方法以函数属性的形式传递给子组件，子组件就可以调用
 * 2.父组件调用子组件
 *      在父组件中通过ref得到自组件标签对象（也就是组件对象），调用其方法
 *
 */
export default PicturesWall;

