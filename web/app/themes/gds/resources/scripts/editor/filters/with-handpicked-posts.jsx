import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { useState, useCallback, useMemo } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import {
  FormTokenField,
  __experimentalToolsPanel as ToolsPanel,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import usePosts from '../hooks/use-posts';

/**
 * @see https://github.com/woocommerce/woocommerce/blob/0608eb7542cef26a11d259703420381d1acb1d0c/plugins/woocommerce-blocks/assets/js/blocks/product-collection/edit/inspector-controls/hand-picked-products-control.tsx
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/extending-the-query-loop-block/
 */

function HandPickedPostsControl({
  setAttributes,
  attributes,
}) {
  const query = attributes.query;
  const selectedPostIds = query?.include;
  const postType = query?.postType;

  const formatPostName = postType && postType !== 'any'
    ? (post) => `${post.title || 'Untitled'} (#${post.id})`
    : (post) => `${post.title || 'Untitled'} (${post.subtype} #${post.id})`;

  const [searchQuery, setSearchQuery] = useState('');
  const {postsMap, postsList} = usePosts(
    searchQuery,
    selectedPostIds,
    postType,
    formatPostName,
  );

  const handleSearch = useDebounce(setSearchQuery, 250);

  const updateQuery = (newQuery) => {
    setAttributes({
      query: {...query, ...newQuery},
    })
  };

  const onTokenChange = useCallback((values) => {
    // Map the tokens to post ids.
    const newPostsSet = values.reduce((acc, nameOrId) => {
      const post = postsMap.get(nameOrId) || postsMap.get(Number(nameOrId));
      if (post) {
        acc.add(String(post.id));
      }
      return acc;
    }, new Set());

    updateQuery({ include: Array.from(newPostsSet) });
  }, [postsMap]);

  const suggestions = useMemo(() => {
    return (
      postsList
        // Filter out posts that are already selected.
        .filter((post) => !selectedPostIds?.includes(String(post.id)))
        .map((post) => formatPostName(post))
    );
  }, [postsList, selectedPostIds]);

  const transformTokenIntoPostName = (token) => {
    const parsedToken = Number(token);

    if (Number.isNaN(parsedToken)) {
      return decodeEntities(token) || '';
    }

    const post = postsMap.get(parsedToken);
    return post ? decodeEntities(formatPostName(post)) : '';
  };

  return (
    <ToolsPanelItem
      label={ __('Hand-picked posts', 'gds' ) }
      hasValue={ () => !! selectedPostIds?.length }
      onDeselect={ () => updateQuery({ include: [] }) }
      resetAllFilter={ () => updateQuery({ include: [] }) }
      isShownByDefault={ true }
    >
      <FormTokenField
        displayTransform={ transformTokenIntoPostName }
        label={ __('Hand-picked posts', 'gds') }
        onChange={ onTokenChange }
        onInputChange={ handleSearch }
        suggestions={ suggestions }
        __experimentalValidateInput={ (value) => postsMap.has(value) }
        value={ ! postsMap.size ? [__('Loading…', 'gds')] : selectedPostIds || [] }
        __experimentalExpandOnFocus={ true }
        __experimentalShowHowTo={ false }
      />
    </ToolsPanelItem>
  );
}

export const withHandpickedPostsQueryControls = (BlockEdit) => (props) => {
  if (props.name !== 'core/query') {
    return <BlockEdit {...props} />;
  }

  return (
    <>
      <BlockEdit { ...props } />
      <InspectorControls>
        <ToolsPanel
        >
          <HandPickedPostsControl
            {...props}
          />
        </ToolsPanel>
      </InspectorControls>
    </>
  );
};

addFilter('editor.BlockEdit', 'core/query', withHandpickedPostsQueryControls);
