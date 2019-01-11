import 'magnific-popup';

const Sage = window.Sage;

$.extend(true, $.magnificPopup.defaults, {
  tClose: Sage.l10n.close,
  tLoading: Sage.l10n.loading,
  gallery: {
    tPrev: Sage.l10n.previous,
    tNext: Sage.l10n.next,
    tCounter: Sage.l10n.counter,
  },
  image: {
    tError: Sage.l10n.image_not_loaded,
  },
  ajax: {
    tError: Sage.l10n.content_not_loaded,
  },
});

export default function (context, options = {}) {
  $(context).find('a[href*=".jpg"], a[href*=".png"]').magnificPopup(Object.assign({
    type: 'image',
    gallery: {enabled: true},
    callbacks: {
      open: () => {
        if (window.Gevent) {
          window.Gevent('ImagePopup', 'Open', $.magnificPopup.instance.currItem.src);
        }
      },
    },
  }, options));
}
