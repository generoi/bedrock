// import external dependencies
import 'babel-polyfill';
import $ from 'jquery';
import picturefill from 'picturefill';
import 'jquery.scrollto';
import 'jquery.localscroll';
import 'fastdom/fastdom';
import 'motion-ui/dist/motion-ui';

// Import components
import gform from './components/gform';
import slick from './components/slick';
import headroom from './components/headroom';
import analytics from './components/analytics';
import magnificpopup from './components/magnificpopup';
// import lazysizes from './components/lazysizes';
import woo from './components/woocommerce';
// import floatlabels from './components/float-labels';
// import gmap from './components/gmap';

// Ensure correct images are set before plugins such as orbit begins measuring
// dimensions.
// lazysizes();
picturefill();
$(document).foundation();

// Custom components
magnificpopup('#content');
headroom('.headroom');
gform();
// @see https://github.com/kenwheeler/slick/issues/3110
slick('.slick', { arrows: false, dots: true, rows: 0 });
$.localScroll({ duration: 200, lazy: true, filter: ':not(.accordion-title)' });
analytics.scrolldepth({
  elements: [
    '#header',
    '#content',
    '#page__listing',
    '#page__comments',
    '#page__related',
    '#footer',
  ],
  percentage: false,
  pixelDepth: false,
});
woo();
// floatlabels('.form__element--vertical, .hs-form-field');
// gmap('[data-gmap]');
