import '~/components/carousel';

/** @wordpress */
import { __ } from '@wordpress/i18n'
import { useRef, useEffect } from '@wordpress/element';
import {
  BlockControls,
  InspectorControls,
  MediaPlaceholder,
  MediaReplaceFlow,
  useBlockProps,
} from '@wordpress/block-editor'

import {
  PanelBody,
  TextControl,
} from '@wordpress/components';

const ALLOWED_MEDIA_TYPES = ['image'];
// @todo doesnt support rearranging
// const ALLOWED_MEDIA_TYPES = ['image', 'video'];

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
      accept="image/*,video/*"
      handleUpload={ false }
      allowedTypes={ ALLOWED_MEDIA_TYPES }
      multiple={ true }
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
  ...attributes
}) {
  const style = {
    ...attributes.style,
    objectPosition: focalPoint
      ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
      : '50% 50%',
  };

  const mediaTypeRenderers = {
    image: () => <img src={ mediaUrl } alt={ mediaAlt } style={ style } {...attributes} />,
    video: () => <video src={ mediaUrl } alt={ mediaAlt } style={ style } {...attributes} />,
  };

  return mediaTypeRenderers[mediaType]();
}


function BlockEdit(props) {
  const {
    attributes,
    setAttributes,
  } = props;

  const {
    media,
    ariaLabel,
  } = attributes;

  const hasMedia = media.length > 0;
  const ref = useRef();

  useEffect(() => {
    ref.current.render();
  }, [media])

  function onSelectMedia(selected) {
    const selectedMedia = selected
      .map((media) => {
        if (!media || !media.url) {
          return false;
        }
        const mediaType = media.media_type ? (media.media_type === 'image' ? 'image' : 'video') : media.type;

        return {
          alt: media.alt,
          id: media.id,
          url: media.url,
          type: mediaType,
          width: media.width,
          height: media.height,
        }
      })
      .filter((media) => media.id);

    setAttributes({media: selectedMedia});
  }

  const controls = (
    <>
      <BlockControls>
        <MediaReplaceFlow
          allowedTypes={ ALLOWED_MEDIA_TYPES }
          multiple={ true }
          accept="image/*,video/*"
          name={ __('Add') }
          onSelect={ onSelectMedia }
          mediaIds={ media.filter((m) => m.id).map((m) => m.id)}
          handleUpload={ false }
          addToGallery={ hasMedia }
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody
          initialOpen={false}
          title={ __('Accessibility') }
        >
          <TextControl
            label={ __('Label') }
            value={ ariaLabel }
            onChange={ (ariaLabel) => setAttributes({ariaLabel})
            }
          />
        </PanelBody>
      </InspectorControls>
    </>
  );

  const blockProps = useBlockProps({});
  const galleryId = Math.random().toString(16).slice(2);

  return (
    <>
      { controls }
      <div { ...blockProps }>
        <gds-carousel className="wp-block-gds-gallery-carousel__slideshow" column-count="1" ref={ ref }>
          { hasMedia && media.map((media, idx) => {
            return (
              <div
                key={ idx }
                className="wp-block-gds-gallery-carousel__slide"
                id={ `${galleryId}-${idx}` }
              >
                <MediaRenderer
                  mediaType={ media.type }
                  mediaUrl={ media.url }
                  mediaAlt={ media.alt }
                  controls={ media.type === 'video' }
                  preload={ media.type === 'video' ? 'metadata' : null }
                  width={ media.width }
                  height={ media.height }
                  style={ { '--aspect-ratio': `${media.width} / ${media.height}` } }
                />
              </div>
            )
          }) || (
            <PlaceholderContainer
              onSelectMedia={ onSelectMedia }
              {...props}
            />
          ) }

          <i slot="icon-prev" className="fa fa-solid fa-chevron-left" />
          <i slot="icon-next" className="fa fa-solid fa-chevron-right" />
        </gds-carousel>

        { hasMedia && media.length > 1 && (
          <gds-carousel-pager className="wp-block-gds-gallery-carousel__thumbs">
            { media.map((media, idx) => {
              return (
                <button
                  key={ idx }
                  aria-controls={ `${galleryId}-${idx}` }
                >
                  <MediaRenderer
                    mediaType={ media.type }
                    mediaUrl={ media.url }
                    mediaAlt={ media.alt }
                    width={ media.width }
                    height={ media.height }
                  />
                </button>
              );
            }) }
          </gds-carousel-pager>
        ) }
      </div>
    </>
  )
}

export default BlockEdit;

