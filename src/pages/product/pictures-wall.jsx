import React, {Component} from 'react';
import {Upload, Icon, Modal, message} from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends Component {
    state = {
        //是否显示大图预览
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };
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
    handleChange = ({file, fileList}) => {

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
        }

        this.setState({
            fileList
        });

    }


    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div >Upload</div>
            </div>
        );
        return (
            <div >
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

export default PicturesWall;