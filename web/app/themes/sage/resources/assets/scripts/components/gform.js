/**
 * Required with Genero\Sage\GravityFormTwig().
 * @see src/custom/gravityform.php
 */
import 'jquery.scrollto';

class GformComponent {
  constructor() {
    this.$document = $(document);
    // Automatically scroll to the confirmation message when submitting
    // a Gravity Form with AJAX.
    this.$document.on('gform_confirmation_loaded', this.scrollToConfirmation.bind(this));
    // Support radio other field.
    this.$document.on('ready', this.initRadioOtherField.bind(this));
  }

  initRadioOtherField() {
    $('[data-gform-other-choice]').on('focus', this.focusOtherField.bind(this));
    $('[data-gform-other-field]').on('focus', this.checkOtherBox.bind(this));
  }

  checkOtherBox(e) {
    const $choice = $(`[data-gform-other-choice="${e.target.id}"]`);
    if ($choice.length) {
      $choice.prop('checked', true);
    }
  }

  focusOtherField(e) {
    const field = $(e.target).data('gformOtherChoice');
    const $field = $(`#${field}`);
    if ($field.length) {
      $field.trigger('focus');
    }
  }

  scrollToConfirmation() {
    $.scrollTo('.gform_confirmation_wrapper', {
      offset: { top: -150, left: 0 },
      duration: 200,
    });
  }
}

export default function (options = {}) {
  return new GformComponent(options);
}
