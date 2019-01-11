import 'scroll-depth';

export default {
  scrolldepth(options = {}) {
    $.scrollDepth(Object.assign({
      userTiming: true,
    }, options));
  },
};
