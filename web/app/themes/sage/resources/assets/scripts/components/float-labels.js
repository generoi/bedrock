import fastdom from 'fastdom/fastdom';

class FloatLabelComponent {
  constructor(el, options = {}) {
    this.options = Object.assign({
      showClass: 'is-active',
      focusClass: 'is-focus',
      activeClass: 'has-float-labels',
    }, options);

    this.$wrapper = $(el);

    // This wont work for checkboxes or radios and hubspot markup doesnt
    // distinguish this on a wrapper level.
    if (this.$wrapper.find('[type="checkbox"], [type="radio"]').length) {
      return;
    }

    // If there are no labels, exit.
    const $labels = this.$wrapper.find('label');
    if (!$labels.length || !$labels.text().length || $labels.text() === '*') {
      return;
    }

    this.$wrapper.addClass(this.options.activeClass);

    // Default to the first label with a `for` attribute.
    this.$label = this.$wrapper.find('label[for]').first();
    // If it doesn't exist, use the first label of any kind.
    if (!this.$label.length) {
      this.$label = this.$wrapper.find('label').first();
    }

    this.$wrapper.on('checkval', 'input, textarea', this.checkActive.bind(this));
    this.$wrapper.on('keyup', 'input, textarea', (e) => $(e.target).trigger('checkval'));
    this.$wrapper.on('focus', 'input, textarea, select', this.focus.bind(this));
    this.$wrapper.on('blur', 'input, textarea, select', this.blur.bind(this));
    this.$wrapper.on('change', 'select', this.checkActive.bind(this));
    this.$wrapper.on('blur', 'input, textarea, select', this.hubspotErrorLabelFix.bind(this));
    this.$wrapper.find('input, textarea').trigger('checkval');
    this.$wrapper.find('select').trigger('change');
  }

  /**
   * Return the label of an input element.
   */
  getLabel(input = null) {
    // If the input's `name` doesn't match the previously detected label's
    // `for`, try and find it now that we know the name for sure.
    if (input && input.name && this.$label && this.$label.prop('for') !== input.name) {
      let $temp = this.$wrapper.find(`label[for="${input.name}"]`);
      if ($temp.length) {
        this.$label = $temp;
      }
    }
    return this.$label;
  }

  /**
   * Add focus state class.
   */
  focus(e) {
    const $label = this.getLabel(e.target);
    fastdom.mutate(() =>
      $(e.target).add($label).addClass(this.options.focusClass)
    );
  }

  /**
   * Remove focus state class.
   */
  blur(e) {
    const $label = this.getLabel(e.target);
    fastdom.mutate(() =>
      $(e.target).add($label).removeClass(this.options.focusClass)
    );
  }

  /**
   * HubSpot doesn't set a class on invalid labels, set one.
   */
  hubspotErrorLabelFix(e) {
    const $label = this.getLabel(e.target);
    const $field = $(e.target);
    setTimeout(() => {
      fastdom.mutate(() => {
        if ($field.hasClass('error')) {
          $label.addClass('is-invalid-label');
        }
      });
    }, 10);
  }

  /**
   * Check if an input field has content set appropriate classes.
   */
  checkActive(e) {
    const input = e.target;
    const $label = this.getLabel(input);

    if (input.value !== '') {
      fastdom.mutate(() =>
        $(input).add($label).addClass(this.options.showClass)
      );
    } else {
      fastdom.mutate(() =>
        $(input).add($label).removeClass(this.options.showClass)
      );
    }
  }
}

export default function (selector, options = {}) {
  $(selector).each((i, el) => new FloatLabelComponent(el, options));
  $(document).on('wp-hubspot:onFormReady', (e, $form) => {
    $form.find(selector).each((i, el) => new FloatLabelComponent(el, options));
  });
}
