<footer class="content-info has-ui-03-background-color has-background">
  <div class="footer">
    <div class="footer__logo">
      <a href="{{ home_url('/') }}" rel="home" aria-label="{{ sprintf(__('%s frontpage', 'gds-a11y'), $siteName) }}">
        <img
          src="{{ Roots\asset('images/logo-white.svg')->uri() }}"
          alt=""
          title="{{ __('Go to frontpage', 'gds-a11y') }}"
          width="123"
          height="30"
          loading="lazy"
          aria-hidden="true"
        />
      </a>
    </div>
    <div class="footer__contact">
      @php(dynamic_sidebar('footer-contact'))
    </div>
    <div class="footer__social">
      @php(dynamic_sidebar('footer-social'))
    </div>
    <nav class="footer__menu" aria-label="{{ __('Footer navigation', 'gds-a11y') }}">
      @php(dynamic_sidebar('footer-menu'))
    </nav>
    <div class="footer__newsletter">
      @php(dynamic_sidebar('footer-newsletter'))
    </div>
  </div>
</footer>
