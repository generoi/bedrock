@php(render_block(['blockName' => 'gds/accordion']))
@php(render_block(['blockName' => 'gds/accordion-item']))
@php(render_block(['blockName' => 'core/button']))
@php(render_block(['blockName' => 'core/buttons']))

<modal-dialog
  class="cookie-consent"
  aria-labelledby="cc-heading"
  aria-describedby="cc-description"
  persistent
  scroll-lock
>
  <h2 id="cc-heading">{{ __('Cookie Preferences', 'gds') }}</h2>
  <p id="cc-description">
    {{ __('We use cookies to provide a better user experience anda personalised service. By consenting to the use of cookies, we can develop an even better service and will be able to provide content that is interesting to you. You are in control of your cookie preferences, and you may change them at any time. Read more about our cookies.') }}
  </p>

  <div id="cookie-settings" class="cookie-consent__cookies">
    <gds-accordion>
      <gds-accordion-item>
        <label slot="label">
          <input type="checkbox" name="cookie-consent" required disabled checked value="consent-necessary">
          {{ __('Necessary', 'gds') }}
        </label>
        <i slot="icon" class="fa fa-solid fa-chevron-down"></i>

        <p>{{ __('These cookies are technically required for our core website to work properly, e.g. security functions or your cookie consent preferences.', 'gds') }}</p>
      </gds-accordion-item>

      <gds-accordion-item>
        <label slot="label">
          <input type="checkbox" name="cookie-consent" value="consent-statistics">
          {{ __('Statistics', 'gds') }}
        </label>
        <i slot="icon" class="fa fa-solid fa-chevron-down"></i>

        <p>{{ __('In order to improve our website going forward, we anonymously collect data for statistical and analytical purposes. With these cookies we can, for instance, monitor the number or duration of visits of specific pages of our website helping us in optimising user experience.', 'gds') }}</p>
      </gds-accordion-item>

      <gds-accordion-item>
        <label slot="label">
          <input type="checkbox" name="cookie-consent" value="consent-marketing">
          {{ __('Marketing', 'gds') }}
        </label>
        <i slot="icon" class="fa fa-solid fa-chevron-down"></i>

        <p>{{ __('These cookies help us in measuring and optimising our marketing efforts.', 'gds') }}</p>
      </gds-accordion-item>
    </gds-accordion>
  </div>

  <div class="wp-block-buttons cookie-consent__buttons">
    <div class="wp-block-button is-style-outline" id="accept-selected-button">
      <button
        data-cookie-consent-accept-selected
        class="wp-block-button__link"
      >{{ __('Accept selected cookies') }}</toggle-button>
    </div>

    <div class="wp-block-button is-style-outline">
      <toggle-button
        persistent
        aria-controls="cookie-settings accept-selected-button"
        class="wp-block-button__link"
      >{{ __('Edit cookie settings') }}</toggle-button>
    </div>

    <div class="wp-block-button">
      <button
        data-cookie-consent-accept-all
        class="wp-block-button__link"
      >{{ __('Accept all cookies') }}</button>
    </div>
  </div>
</modal-dialog>
