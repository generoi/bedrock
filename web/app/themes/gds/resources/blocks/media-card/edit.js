import classnames from 'classnames';

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
  } = props;

  const {
    focalPoint,
    mediaId,
    mediaType,
    mediaUrl,
    mediaAlt,
    textAlign,
  } = attributes;

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
    className: classnames({
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
          { hasMedia && (
            <MediaRenderer
              mediaType={ mediaType }
              mediaUrl={ mediaUrl }
              mediaAlt={ mediaAlt }
              focalPoint={ focalPoint }
            />
          ) || (
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
