/** @wordpress */
import {__} from '@wordpress/i18n';
import {
  SearchControl,
  SelectControl,
  Spinner,
  Placeholder,
  RadioControl,
} from '@wordpress/components';
import {useState} from '@wordpress/element';
import {decodeEntities} from '@wordpress/html-entities';
import {useDebounce} from '@wordpress/compose';
import usePosts from '../hooks/use-posts';
import {usePostTypes} from '../hooks/use-post-types';

/**
 * @see https://github.com/WordPress/gutenberg/blob/8112ec2e82b6968f8699e672ae1a4b22897c58e8/docs/how-to-guides/data-basics/2-building-a-list-of-pages.md
 */

function PostList({hasResolved, posts, selected, onChange}) {
  if (!hasResolved) {
    return <Spinner />;
  }
  if (!posts?.length) {
    return <div>No results</div>;
  }

  const options = posts.map((post) => {
    return {
      label: `${decodeEntities(post.title)} (#${post.id})`,
      value: post.id,
    };
  });

  return (
    <div
      style={{
        maxHeight: '200px',
        overflow: 'scroll',
        padding: '0.5em',
        border: 'solid 1px #ccc',
        width: '100%',
      }}
    >
      <RadioControl
        selected={selected}
        options={options}
        onChange={(postId) => {
          const post = posts.find((post) => post.id === Number(postId));
          onChange(post);
        }}
      />
    </div>
  );
}

export function PostPlaceholder({postType, postId, onChange, onSetPostType}) {
  const [searchQuery, setSearchQuery] = useState('');
  const {postsMap, postsList} = usePosts(searchQuery, postId, postType);
  const {postTypesOptions} = usePostTypes();

  const handleSearch = useDebounce(setSearchQuery, 250);
  const hasResolved = !!postsMap.size;

  console.log('PostPlaceholder');
  console.log(postTypesOptions);
  return (
    <Placeholder label={__('Search content')}>
      <SearchControl onChange={handleSearch} value={searchQuery} />

      <SelectControl
        label={__('Post Type')}
        hideLabelFromVision={true}
        style={{
          backgroundColor: '#f0f0f0',
          height: '40px',
        }}
        value={postType}
        options={postTypesOptions}
        onChange={(newPostType) => onSetPostType(newPostType)}
      />

      <PostList
        hasResolved={hasResolved}
        selected={postId}
        posts={postsList}
        onChange={onChange}
      />
    </Placeholder>
  );
}
