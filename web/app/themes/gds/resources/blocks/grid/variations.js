const variations = [
  {
    name: 'two-media-cards',
    title: '2 Media Card',
    description: 'A grid displaying 2 Media Cards in a row',
    innerBlocks: [
      ['gds/media-card'],
      ['gds/media-card'],
    ],
    attributes: {columns: 2, allowedBlocks: ['gds/media-card']},
    scope: ['block'],
  },
  {
    name: 'three-media-cards',
    title: '3 Media Card',
    description: 'A grid displaying 3 Media Cards in a row',
    innerBlocks: [
      ['gds/media-card'],
      ['gds/media-card'],
      ['gds/media-card'],
    ],
    attributes: {columns: 3, allowedBlocks: ['gds/media-card']},
    scope: ['block'],
  },
];

export default variations;

