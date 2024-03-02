import '~/components/carousel';

/** @wordpress */
import { __ } from '@wordpress/i18n'
import {
  BlockControls,
  MediaPlaceholder,
  MediaReplaceFlow,
  useBlockProps,
} from '@wordpress/block-editor'

const ALLOWED_MEDIA_TYPES = ['image', 'video'];

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
  } = attributes;

  const hasMedia = media.length > 0;

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
          onSelect={ onSelectMedia }
          mediaIds={ media.filter((m) => m.id).map((m) => m.id)}
          addToGallery={ hasMedia }
        />
      </BlockControls>
    </>
  );

  const blockProps = useBlockProps({});
  const galleryId = Math.random().toString(16).slice(2);

  return (
    <>
      { controls }
      <div { ...blockProps }>
        <gds-carousel className="wp-block-gds-gallery-carousel__slideshow" column-count="1">
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

