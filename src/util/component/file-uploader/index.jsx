/*
 * @Author: PsiloLau 
 * @Date: 2017-12-29 14:26:41 
 * @Last Modified by:   PsiloLau 
 * @Last Modified time: 2017-12-29 14:26:41 
 */
'use strict';

import React        from 'react';
import ReactDOM     from 'react-dom';
import FileUpload   from 'react-fileupload';

import MMUtile from 'util/mm.jsx';

const _mm = new MMUtile();

const FileUploader = React.createClass({
    getInitialState() {
        return {
            
        };
    },
    componentDidMount(){

    },
    render() {
        /*set properties*/
        const options={
            baseUrl         : _mm.getServerUrl('/product/upload.do'),
            fileFieldName   : 'upload_file',
            accept          : 'image/gif,image/jpeg,image/jpg,image/png',
            chooseAndUpload : true,
            uploadSuccess   : this.props.onSuccess,
            uploadError     : this.props.onError
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload">上传图片</button>
            </FileUpload>
        )           
    }
});

export default FileUploader;