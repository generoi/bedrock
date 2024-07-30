import {
  getBlockVariations,
  registerBlockVariation,
  unregisterBlockVariation,
} from '@wordpress/blocks';

const PRODUCT_TEMPLATE_BLOCK = [
  'woocommerce/product-template',
  {},
  [['gds/post-teaser', {}]],
];

window._wpLoadBlockEditor.then(() => {
  for (const variation of getBlockVariations(
    'woocommerce/product-collection',
  )) {
    variation.innerBlocks = variation.innerBlocks.map((block) => {
      const [name, attributes, innerBlocks] = block;
      switch (name) {
        case 'core/heading':
          delete attributes.style;
          break;
        case 'woocommerce/product-template':
          return PRODUCT_TEMPLATE_BLOCK;
      }

      return [name, attributes, innerBlocks].filter(Boolean);
    });

    unregisterBlockVariation('woocommerce/product-collection', variation.name);

    variation.attributes.align = 'wide';
    // The default one has to be removed and added with a different name to take effect
    if (variation.name === 'woocommerce/product-collection/product-catalog') {
      variation.attributes.query.inherit = false;
      registerBlockVariation('woocommerce/product-collection', {
        ...variation,
        name: 'woocommerce/product-collection/product-catalog-2',
      });
      continue;
    }
    registerBlockVariation('woocommerce/product-collection', variation);
  }
});
