/*
 * @Author: PsiloLau 
 * @Date: 2017-12-14 17:22:41 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-29 14:15:23
 */
'use strict';
require('./index.css');
var _mm = require('util/mm_manage.js');
require('simditor');

var page = {
    init: function () {
      this.onLoad();
      this.bindEvent();
    },
    onLoad: function () {
      // 初始化左侧菜单
      navSide.init({
        name: 'product-add'
      });
      // 加载用户信息
      this.loadProductInfo();
    },
    bindEvent: function() {
  
    },
    // 加载用户信息
    loadProductInfo: function () {
      var userHtml = _mm.renderHtml(templateIndex, '');
      $('.panel-body').html(userHtml);
    }
  };
  $(function () {
    page.init();
  });

const RichEditor = {
  getInitialState() {
      return {
          
      };
  },
  componentDidMount(){
      this.loadEditor();
  },
  loadEditor(){
      this.textarea  = this.refs['textarea'];
      this.editor = new Simditor({
          textarea: $(this.textarea),
          defaultValue: this.props.placeholder,
          upload:{
              url             : _mm.getServerUrl('/product/richtext_img_upload.do'),
              defaultImage    : '',
              fileKey         :'upload_file'
          }
      });
      // bind event
      this.bindEditorEvent();
  },
  bindEditorEvent(){
      this.editor.on('valuechanged', e => {
          this.props.onValueChange(this.editor.getValue());
      })
  },
  setValue(value){
      this.editor.setValue(value);
  },
  render() {
      return (
          <div className="rich-editor">
              <textarea ref="textarea"></textarea>
          </div>
      )           
  }
};

export default RichEditor;