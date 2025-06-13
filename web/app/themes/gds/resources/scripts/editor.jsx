import domReady from '@wordpress/dom-ready';
import {
  registerBlockStyle,
  unregisterBlockType,
  unregisterBlockStyle,
  registerBlockCollection,
} from '@wordpress/blocks';

import './editor/block-variations/core-query';
import './editor/filters/with-handpicked-posts';
import './editor/filters/with-namespace-attribute';
import './editor/filters/with-group-grid-columns';

registerBlockCollection('gds', {title: 'Genero Design System'});

domReady(() => {
  registerBlockStyle('core/list', {
    name: 'spacious',
    label: 'Spacious',
  });
  registerBlockStyle('core/columns', {
    name: 'media-text',
    label: 'Media & Text',
  });

  // Unregister Default Blocks Styles
  unregisterBlockStyle('core/separator', 'dots');
  unregisterBlockStyle('core/separator', 'wide');

  [
    'woocommerce/all-products',
    // 'woocommerce/all-reviews',
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
    // 'woocommerce/reviews-by-category',
    // 'woocommerce/reviews-by-product',
  ].forEach((block) => {
    unregisterBlockType(block);
  });
});
