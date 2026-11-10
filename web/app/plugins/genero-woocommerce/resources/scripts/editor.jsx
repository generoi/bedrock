import domReady from '@wordpress/dom-ready';
import {unregisterBlockType} from '@wordpress/blocks';

import './editor/block-variations/woocommerce-product-collection';

domReady(() => {
  [
    'woocommerce/all-products',
    'woocommerce/classic-shortcode',
    'woocommerce/coming-soon',
    'woocommerce/handpicked-products',
    'woocommerce/products-by-attribute',
    'woocommerce/product-best-sellers',
    'woocommerce/product-category',
    'woocommerce/product-new',
    'woocommerce/product-on-sale',
    'woocommerce/product-tag',
    'woocommerce/product-top-rated',
  ].forEach((block) => {
    unregisterBlockType(block);
  });
});
