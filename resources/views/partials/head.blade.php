<script type="module">
  import { applyPolyfills, defineCustomElements } from '{{ Roots\asset('gds/loader/index.mjs') }}'

  applyPolyfills().then(() => {
    defineCustomElements()
  })
</script>
