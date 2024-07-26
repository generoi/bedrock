import clsx from 'clsx';

/** @wordpress */
import { __ } from '@wordpress/i18n'
import {
  AlignmentControl,
  BlockControls,
  MediaPlaceholder,
  MediaReplaceFlow,
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor'

import {
  PanelBody,
  FocalPointPicker,
} from '@wordpress/components';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

import { attributesFromMedia } from '~/editor/utils.js';

const ALLOWED_MEDIA_TYPES = ['image'];
const INNER_BLOCKS_TEMPLATE = [
  [
    'core/heading', { placeholder: __('Write heading…'), level: 3 },
  ],
  [
    'core/paragraph', { placeholder: __('Write content…') },
  ],
];
const ALLOWED_BLOCKS = [
  'core/heading',
  'core/paragraph',
  'core/buttons',
  'core/button',
];

function PlaceholderContainer( {
  className,
  noticeOperations,
  noticeUI,
  onSelectMedia,
} ) {
  const onUploadError = (message) => {
    noticeOperations.removeAllNotices();
    noticeOperations.createErrorNotice(message);
  };

  return (
    <MediaPlaceholder
      labels={ {
        title: __('Media'),
        instructions: __('Upload an image file, or pick one from your media library.'),
      } }
      className={ className }
      onSelect={ onSelectMedia }
      accept="image/*"
      allowedTypes={ ALLOWED_MEDIA_TYPES }
      notices={ noticeUI }
      onError={ onUploadError }
    />
  );
}

function MediaRenderer({
  mediaType,
  mediaUrl,
  mediaAlt,
  focalPoint,
}) {
  const style = {
    objectPosition: focalPoint
      ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
      : '50% 50%',
  };

  const mediaTypeRenderers = {
    image: () => <img src={ mediaUrl } alt={ mediaAlt } style={ style } />,
  };

  return mediaTypeRenderers[mediaType]();
}


function BlockEdit(props) {
  const {
    attributes,
    setAttributes,
    context,
  } = props;

  const {
    focalPoint,
    mediaId,
    mediaType,
    mediaUrl,
    mediaAlt,
    textAlign,
    useFeaturedImage,
  } = attributes;

  const {
    postId,
    postType
  } = context;

  const [featuredImage] = useEntityProp('postType', postType, 'featured_media', postId);
  const featuredImageMedia = useSelect((select) => {
      return featuredImage && select(coreStore).getMedia(featuredImage, {context: 'view'})
  }, [featuredImage]);

  const featuredImageUrl = featuredImageMedia?.source_url;
  const onSelectMedia = attributesFromMedia(setAttributes);
  const hasMedia = mediaType && mediaUrl;

  const controls = (
    <>
      <BlockControls>
        { hasMedia && (
          <MediaReplaceFlow
            mediaId={ mediaId }
            mediaURL={ mediaUrl }
            allowedTypes={ ALLOWED_MEDIA_TYPES }
            accept="image/*"
            onSelect={ onSelectMedia }
          />
        ) }
        <AlignmentControl
          value={ textAlign }
          onChange={ (textAlign) => setAttributes({textAlign}) }
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody title={ __('Media settings') }>
          <FocalPointPicker
            label={ __('Focal point picker') }
            url={ mediaUrl }
            value={ focalPoint }
            onChange={ (focalPoint) => setAttributes({focalPoint})
            }
          />
        </PanelBody>
      </InspectorControls>
    </>
  );

  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign,
    })
  });
  const innerBlockProps = useInnerBlocksProps(
    { className: 'wp-block-gds-media-card__content' },
    { template: INNER_BLOCKS_TEMPLATE, allowedBlocks: ALLOWED_BLOCKS }
  );

  return (
    <>
      { controls }
      <div { ...blockProps }>
        <figure className="wp-block-gds-media-card__media">
          { useFeaturedImage ? (
            <MediaRenderer
              mediaType={ 'image' }
              mediaUrl={ featuredImageUrl }
            />
          ) : hasMedia ? (
            <MediaRenderer
              mediaType={ mediaType || 'image' }
              mediaUrl={ mediaUrl }
              mediaAlt={ mediaAlt }
              focalPoint={ focalPoint }
            />
          ) : (
            <PlaceholderContainer
              onSelectMedia={ onSelectMedia }
              {...props}
            />
          ) }
        </figure>
        <div {...innerBlockProps} />
      </div>
    </>
  )
}

export default BlockEdit;
