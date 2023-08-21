@if( $innerBlocks ?? false )
  <div {!! get_block_wrapper_attributes() !!}>
    <div class="wp-block-buttons" role="tablist">
      @foreach( $innerBlocks as $key => $tab )
        <div class="wp-block-button" role="tab">
          <button class="wp-block-button__link {{ $key === 0 ? 'active' : '' }}"
                  type="button"
                  role="presentation"
                  id="tab-{{ sanitize_title( $tab['attrs']['label'] ) }}"
                  aria-controls="tabpanel-{{ sanitize_title( $tab['attrs']['label']) }}"
                  aria-selected="{{ $key === 0 ? 'true' : 'false' }}"
                  tabindex="{{ $key === 0 ? '0' : '-1' }}"
          >
            {!! $tab['attrs']['label'] !!}
          </button>
        </div>
      @endforeach
    </div>

    <div class="wp-block-gds-tabs__panels">
      {!! $content !!}
    </div>
  </div>
@endif
