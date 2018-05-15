/*
* @Author: Rosen
* @Date:   2017-02-24 10:35:19
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-05-15 15:35:37
*/

'use strict';
import MMUtile from 'util/mm.jsx';

const _mm = new MMUtile();

export default class Product {
  // 头像上传
  saveAvatar(image) {
    return _mm.request({
      url: _mm.getServerUrl('/user/save_avatar.do'),
      data: {
        image: image
      }
    });
  }

  // 获取商品信息
  getProduct(productId) {
    return _mm.request({
      url: _mm.getServerUrl('/product/detail.do'),
      data: {
        productId: productId || 0
      }
    });
  }
  // 获取商品信息
  getProductList(listParam) {
    if (listParam.listType == 'list') {
      return _mm.request({
        url: _mm.getServerUrl('/product/list.do'),
        data: {
          pageNum: listParam.pageNum || 1
        }
      });
    }
    else if (listParam.listType == 'search') {
      return _mm.request({
        url: _mm.getServerUrl('/product/search.do'),
        data: listParam
      });
    }

  }
  // 获取商品信息
  saveProduct(product) {
    return _mm.request({
      url: _mm.getServerUrl('/product/save.do'),
      data: product
    });
  }
  // 改变商品状态
  setProductStatus(productId, status) {
    return _mm.request({
      url: _mm.getServerUrl('/product/set_sale_status.do'),
      data: {
        productId: productId,
        status: status
      }
    });
  }
  // 获取品类
  getCategory(parentCategoryId) {
    return _mm.request({
      url: _mm.getServerUrl('/category/get_category.do'),
      data: {
        categoryId: parentCategoryId || 0
      }
    });
  }
  // 新增品类
  saveCategory(category) {
    return _mm.request({
      url: _mm.getServerUrl('/category/add_category.do'),
      data: {
        parentId: category.parentId || 0,
        categoryName: category.categoryName || ''
      }
    });
  }
  // 更新品类名称
  updateCategoryName(category) {
    return _mm.request({
      url: _mm.getServerUrl('/category/set_category_name.do'),
      data: category
    });
  }
}
