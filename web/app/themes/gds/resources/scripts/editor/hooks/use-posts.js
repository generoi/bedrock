import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { uniqBy } from '../utils';

/**
 * @see https://github.com/woocommerce/woocommerce/blob/0608eb7542cef26a11d259703420381d1acb1d0c/plugins/woocommerce-blocks/assets/js/blocks/product-collection/edit/inspector-controls/hand-picked-products-control.tsx
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/extending-the-query-loop-block/
 */

export function getPostsRequests({
  selected = [],
  search = '',
  queryArgs = {},
  postType = 'any',
}) {
  const defaultArgs = {
    per_page: 100,
    search,
    orderby: 'title',
    order: 'asc',
    type: 'post',
    subtype: postType,
  };
  const requests = [
    addQueryArgs('/wp/v2/search', {
      ...defaultArgs,
      ...queryArgs,
    } ),
  ];
  // Ensure the selected posts are always included regardless of per_page limit
  if (selected.length) {
    requests.push(
      addQueryArgs('/wp/v2/search', {
        include: selected,
        per_page: 100,
      })
    );
  }

  return requests;
}

export function getPosts({
  selected = [],
  search = '',
  queryArgs = {},
  postType,
}) {
  const requests = getPostsRequests({ selected, search, queryArgs, postType });
  return Promise.all(requests.map((path) => apiFetch({path})))
    .then((data) => {
      const flatData = data.flat();
      const posts = uniqBy(flatData, (item) => item.id);
      return posts.map((post) => ({
        ...post,
      }));
    })
    .catch((e) => {
      throw e;
    });
}

export default function usePosts(
  search,
  selected,
  postType,
  formatPostName = (post) => post.title
) {
  const [postsMap, setPostsMap] = useState(new Map());
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const query = {
      selected: selected || [],
      search,
      postType: postType || 'post',
    };

    getPosts(query).then((results) => {
      const newPostsMap = new Map();
      results.forEach((post) => {
        newPostsMap.set(post.id, post);
        newPostsMap.set(formatPostName(post), post);

      });
      setPostsList(results);
      setPostsMap(newPostsMap);
    });
  }, [search, selected, postType]);

  return { postsMap, postsList };
}

