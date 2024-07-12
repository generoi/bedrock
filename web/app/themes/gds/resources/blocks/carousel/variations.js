const variations = [
  {
    name: 'basic',
    title: 'Basic',
    innerBlocks: [
      ['gds/carousel-item', {}, [
        ['core/paragraph', {}],
      ]],
      ['gds/carousel-item', {}, [
        ['core/paragraph', {}],
      ]],
    ],
		scope: ['block'],
  },
  {
    name: 'three-media-cards',
    title: '3 Media Cards',
    description: 'A carousel displaying Media Cards 3 at a time',
    innerBlocks: [
      ['gds/carousel-item', {templateLock: 'all'}, [
        ['gds/media-card', {lock:{remove: true}}],
      ]],
      ['gds/carousel-item', {templateLock: 'all'}, [
        ['gds/media-card', {lock:{remove: true}}],
      ]],
      ['gds/carousel-item', {templateLock: 'all'}, [
        ['gds/media-card', {lock:{remove: true}}],
      ]],
    ],
    attributes: {columnCount: 3},
		scope: ['block', 'inserter'],
  },
];

export default variations;
