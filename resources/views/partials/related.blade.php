<h2 class="has-h-1-font-size has-text-align-center">{{ __('More content in the same category', 'gds') }}</h2>

@include('blocks.article-list', [
  'block' => (object) [
    'classes' => 'wp-block-article-list alignwide',
  ],
  'use_pagination' => false,
  'query' => new WP_Query([
    'category__in' => wp_list_pluck(get_the_category(), 'term_id'),
    'post__not_in' => [get_the_ID()],
    'post_type' => 'post',
    'posts_per_page' => 3,
    'post_status' => 'publish',
    'ignore_sticky_posts' => true,
  ]),
])
