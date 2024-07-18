<div {!! get_block_wrapper_attributes() !!}>
  @if (! $is_preview)
    @php woocommerce_output_product_data_tabs() @endphp
  @else
    Product Tabs placeholder
  @endif
</div>
