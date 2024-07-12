import { Path, SVG } from '@wordpress/components';

const variations = [
  {
    name: 'basic',
    title: 'Basic',
    icon: (
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <Path d="M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z" />
      </SVG>
    ),
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
    icon: (
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <Path d="M0 10a2 2 0 0 1 2-2h10.531c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H2a2 2 0 0 1-2-2V10Zm16.5 0c0-1.105.864-2 1.969-2H29.53c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H18.47c-1.105 0-1.969-.895-1.969-2V10Zm17 0c0-1.105.864-2 1.969-2H46a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H35.469c-1.105 0-1.969-.895-1.969-2V10Z" />
      </SVG>
    ),
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
