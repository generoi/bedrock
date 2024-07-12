import { Path, SVG } from '@wordpress/components';

const variations = [
  {
    name: 'two-media-cards',
    title: '2 Media Card',
    description: 'A grid displaying 2 Media Cards in a row',
    icon: (
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <Path d="M0 10a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Zm25 0a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H27a2 2 0 0 1-2-2V10Z" />
      </SVG>
    ),
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
      ['gds/media-card'],
      ['gds/media-card'],
      ['gds/media-card'],
    ],
    attributes: {columns: 3, allowedBlocks: ['gds/media-card']},
    scope: ['block'],
  },
];

export default variations;

