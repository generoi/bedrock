<footer class="content-info has-ui-03-background-color has-background">
  <div class="footer">
    <div class="footer__logo">
      <img src="{{ Roots\asset('images/logo-white.svg')->uri() }}" alt="{{ __('logo', 'gds') }}" title="{{ __('Go to frontpage', 'gds') }}" />
    </div>
    <div class="footer__contact">
      @php(dynamic_sidebar('footer-contact'))
    </div>
    <div class="footer__social">
      @php(dynamic_sidebar('footer-social'))
    </div>
    <div class="footer__menu">
      @php(dynamic_sidebar('footer-menu'))
    </div>
    <div class="footer__newsletter">
      @php(dynamic_sidebar('footer-newsletter'))
    </div>
  </div>
</footer>
