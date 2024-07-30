<footer
  class="content-info has-primary-background-color has-background is-block-container"
>
  <div class="footer alignwide">
    <div class="footer__logo">
      <a
        href="{{ $home_url }}"
        rel="home"
        aria-label="{{ sprintf(__('%s frontpage', 'gds'), $siteName) }}"
      >
        <img
          src="{{ Roots\asset('images/logo-white.svg')->uri() }}"
          alt=""
          title="{{ __('Go to frontpage', 'gds') }}"
          width="123"
          height="30"
          loading="lazy"
          sizes="auto, 123px"
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
    <nav
      class="footer__menu"
      aria-label="{{ __('Footer navigation', 'gds') }}"
    >
      @php(dynamic_sidebar('footer-menu'))
    </nav>
    <div class="footer__newsletter">
      @php(dynamic_sidebar('footer-newsletter'))
    </div>
  </div>
  <div class="content-info__terms-conditions alignwide">
    @php(dynamic_sidebar('footer-terms-conditions'))
  </div>
</footer>
