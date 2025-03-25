@if( $block->inner_blocks ?? false )
  <div {!! get_block_wrapper_attributes() !!}>
    <div class="wp-block-buttons" role="tablist">
      @foreach( $block->inner_blocks as $index => $inner_block )
        <button class="wp-block-button__link"
                type="button"
                role="tab"
                id="tab-{{ $uid }}-{{ $index }}"
                aria-controls="tabpanel-{{ $uid }}-{{ $index }}"
                aria-selected="{{ $index === 0 ? 'true' : 'false' }}"
        >
          {!! $inner_block->parsed_block['attrs']['label'] !!}
        </button>
      @endforeach
    </div>

    <div class="wp-block-gds-tabs__panels">
      @foreach( $block->inner_blocks as $index => $inner_block )
        @php
          $inner_block->attributes['index'] = $index;
          $inner_block->attributes['uid'] = $uid;
        @endphp

        {!! $inner_block->render() !!}
      @endforeach
    </div>
  </div>
@endif
