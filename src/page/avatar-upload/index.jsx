'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import FileUploader from 'util/component/file-uploader/index.jsx';

import MMUtile from 'util/mm.jsx';
import Product from 'service/product.jsx';

const _mm = new MMUtile();
const _product = new Product();

import './index.css';
  
const ProductSave = React.createClass({
  getInitialState() {
    return {
      subImages: [],
    };
  },
  componentDidMount: function () {
  },
  // 图片上传成功
  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res.data.uri);
    this.setState({
      subImages: subImages
    });
  },
  // 图片上传失败
  onUploadError(err) {
    alert(err.message || '哪里不对了~');
  },
  // 删除图片
  onDeleteImage(img) {
    let subImages = this.state.subImages,
      imageIndex = subImages.indexOf(img);
    if (imageIndex >= 0) {
      subImages.splice(imageIndex, 1);
    }
    this.setState({
      subImages: subImages
    });
  },
  // 提交表单
  onSubmit(e) {
    // 阻止提交
    e.preventDefault();
    // 需要提交的字段
    let subImages = this.state.subImages.join(',')
    // 保存product
    _product.saveAvatar(subImages).then(res => {
      alert(res);
      location.href = './user-center.html';
    }, err => {     
      alert(err.msg || '哪里不对了');
      console.log('permission denied');
      location.href = './user-center.html';
    });
  },
  render() {
    return (
      <div id="page-wrapper">
        <div className="row">
          <div className="form-wrap col-lg-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputEmail3" className="col-md-2 control-label">上传头像</label>
                <div className="img-con col-md-10">
                  {
                    this.state.subImages.length ? this.state.subImages.map((image, index) => {
                      return (
                        <div className="sub-img" key={index}>
                          <img className="img" src={_mm.getImageUrl(image)} />
                          <i className="fa fa-close fa-fw" onClick={this.onDeleteImage.bind(this, image)}></i>
                        </div>
                      );
                    }) : <div className="notice">请上传头像</div>
                  }
                </div>
                <div className="col-md-offset-2 col-md-10">
                  {
                    this.state.subImages.length == 1 ? '' : <FileUploader onSuccess={this.onUploadSuccess} onError={this.onUploadError} />
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button type="btn" className="btn btn-xl btn-primary" onClick={this.onSubmit}>提交</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default ProductSave;