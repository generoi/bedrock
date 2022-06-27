import classnames from 'classnames';

/** @wordpress */
import { __ } from '@wordpress/i18n'
import {
  withColors,
  BlockControls,
  MediaPlaceholder,
  MediaReplaceFlow,
  InspectorControls,
  useBlockProps,
  __experimentalUseInnerBlocksProps as useInnerBlocksProps,
  __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor'

import {
  PanelBody,
  FocalPointPicker,
} from '@wordpress/components';

import { attributesFromMedia } from '../../utils';

const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];
const INNER_BLOCKS_TEMPLATE = [
  [
    'core/heading', { placeholder: __('Write heading…'), level: 3 },
  ],
  [
    'core/paragraph', { placeholder: __('Description…') },
  ],
  [
    'core/buttons', {}, [
      [
        'core/button', { placeholder: __('Read more…')},
      ],
    ],
  ],
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
        instructions: __('Upload an image or video file, or pick one from your media library.'),
      } }
      className={ className }
      onSelect={ onSelectMedia }
      accept="image/*,video/*"
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
    video: () => <video autoPlay muted loop src={ mediaUrl } style={ style } />,
  };

  return mediaTypeRenderers[mediaType]();
}


function BlockEdit(props) {
  const {
    attributes,
    setAttributes,
    backgroundColor,
    textColor,
    setBackgroundColor,
    setTextColor,
  } = props;

  const {
    focalPoint,
    mediaId,
    mediaType,
    mediaUrl,
    mediaAlt,
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
            accept="image/*,video/*"
            onSelect={ onSelectMedia }
          />
        ) }
      </BlockControls>
      <InspectorControls>
        <PanelBody title={ __('Media settings') }>
          <FocalPointPicker
              label={ __( 'Focal point picker' ) }
              url={ mediaUrl }
              value={ focalPoint }
              onChange={ (value) =>
                setAttributes({ focalPoint: value })
              }
          />
        </PanelBody>
        <PanelColorGradientSettings
          title={ __('Background & Text Color') }
          settings={ [
            {
              colorValue: textColor.color,
              onColorChange: setTextColor,
              label: __('Text color'),
            },
            {
              colorValue: backgroundColor.color,
              onColorChange: setBackgroundColor,
              label: __('Background'),
            },
          ] }
        >
        </PanelColorGradientSettings>
      </InspectorControls>
    </>
  );

  const containerBlockProps = useBlockProps({
    className: classnames({
      'has-background': backgroundColor.color,
      [ backgroundColor.class ]: backgroundColor.class,
      'has-text-color': textColor.color,
      [ textColor.class ]: textColor.class,
    }),
  });

  const innerBlockProps = useInnerBlocksProps(
    { className: 'wp-block-gds-media-card__content is-block-container' },
    { template: INNER_BLOCKS_TEMPLATE }
  );

  return (
    <>
      { controls }
      <div { ...containerBlockProps }>
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

export default withColors('backgroundColor', {textColor: 'color'})(BlockEdit);
