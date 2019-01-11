export default function() {
  const $document = $(document);

  // Woocommerce JS disables the review link as we use our own tabs.
  $document.on('click', '.woocommerce-review-link', () => {
    const $tab = $('a[href="#reviews"][role="tab"]').trigger('click');
    $.scrollTo($tab, {
      offset: { top: -150, left: 0 },
      duration: 200,
    });
  });
}
