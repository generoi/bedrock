import {
  getBlockVariations,
  registerBlockVariation,
  unregisterBlockVariation,
} from '@wordpress/blocks';

/**
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/extending-the-query-loop-block/
 */

const ARCHIVE_GRID_TEMPLATE = [
  [
    'core/post-template',
    {
      layout: {
        type: 'grid',
        columnCount: 3,
      },
    },
    [
      ['gds/post-teaser'],
    ],
  ],
  ['core/query-pagination'],
  ['core/query-no-results'],
]

window._wpLoadBlockEditor.then(() => {
  // Remove all default query block variations
  for (const variation of getBlockVariations('core/query')) {
    unregisterBlockVariation('core/query', variation.name);
  }

  registerBlockVariation('core/query', {
    name: 'gds/article-grid',
    title: 'Article Grid',
    icon: 'admin-post',
    description: 'Display all articles in a 3 column grid',
    scope: ['inserter', 'block', 'transform'],
    isActive: ['namespace', 'query.postType'],
    attributes: {
      align: 'wide',
      query: {
        itemsPerPage: 9,
        postType: 'post',
      },
    },
    innerBlocks: [
      ...ARCHIVE_GRID_TEMPLATE,
    ],
  });

  registerBlockVariation('core/query', {
    name: 'gds/page-grid',
    title: 'Page Grid',
    icon: 'admin-page',
    description: 'Display all pages in a 3 column grid',
    scope: ['inserter', 'block', 'transform'],
    isActive: ['namespace', 'query.postType'],
    attributes: {
      align: 'wide',
      query: {
        itemsPerPage: 9,
        postType: 'page',
      },
    },
    innerBlocks: [
      ...ARCHIVE_GRID_TEMPLATE,
    ],
  });
});
