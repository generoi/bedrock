import clsx from 'clsx';

/** @wordpress */
import {
  AlignmentControl,
  BlockControls,
  useBlockProps,
} from '@wordpress/block-editor';
import {useSelect} from '@wordpress/data';
import {store as coreStore} from '@wordpress/core-data';
import {Spinner} from '@wordpress/components';
import {PostPlaceholder} from '../../scripts/editor/components/post-placeholder';

/**
 * @see https://github.com/WordPress/gutenberg/blob/8112ec2e82b6968f8699e672ae1a4b22897c58e8/docs/how-to-guides/data-basics/2-building-a-list-of-pages.md
 */

function unwrapHtml(html) {
  const element = document.createElement('div');
  element.innerHTML = html;

  return element.children[0].innerHTML;
}

function BlockEdit(props) {
  const {attributes, setAttributes, context, isSelected} = props;
  const isInsideQueryBlock = 'queryId' in context;

  const {postId, postType} = isInsideQueryBlock ? context : attributes;

  const {textAlign} = attributes;

  const {teaser} = useSelect(
    (select) => {
      if (!postId) {
        return '';
      }

      const {getEntityRecord, hasFinishedResolution} = select(coreStore);
      const post = getEntityRecord('postType', postType, postId);
      const hasResolved = hasFinishedResolution('getEntityRecord', [
        'postType',
        postType,
        postId,
      ]);
      return {
        teaser: hasResolved ? unwrapHtml(post.rendered_post_teaser) : '',
      };
    },
    [postId, postType],
  );

  const controls = (
    <>
      <BlockControls>
        <AlignmentControl
          value={textAlign}
          onChange={(textAlign) => setAttributes({textAlign})}
        />
      </BlockControls>
    </>
  );

  const showPlaceholder = !isInsideQueryBlock && (!postId || isSelected);
  const blockProps = useBlockProps({
    className: clsx(`wp-block-gds-post-teaser--${postType}`, {
      [`has-text-align-${textAlign}`]: textAlign,
      ['has-placeholder']: showPlaceholder,
    }),
  });

  return (
    <>
      {controls}
      {showPlaceholder ?
        <div {...blockProps}>
          <PostPlaceholder
            postType={postType}
            postId={postId}
            onChange={(post) =>
              setAttributes({
                postId: post.id,
                postType: post.subtype,
              })
            }
            onSetPostType={(newPostType) =>
              setAttributes({
                postId: newPostType === postType ? postId : undefined,
                postType: newPostType,
              })
            }
          />
        </div>
      : teaser ?
        <div {...blockProps} dangerouslySetInnerHTML={{__html: teaser}} />
      : <div {...blockProps}>
          <Spinner />
        </div>
      }
    </>
  );
}

export default BlockEdit;
