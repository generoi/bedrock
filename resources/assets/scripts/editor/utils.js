export function attributesFromMedia(setAttributes) {
  return ( media ) => {
    if (!media || !media.url) {
      setAttributes({ url: undefined, id: undefined });
      return;
    }
    let mediaType;

    // for media selections originated from a file upload.
    if (media.media_type) {
      if (media.media_type === 'image') {
        mediaType = 'image';
      } else {
        // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
        // video contain the media type of 'file' in the object returned from the rest api.
        mediaType = 'video';
      }
    } else {
      // for media selections originated from existing files in the media library.
      mediaType = media.type;
    }

    setAttributes( {
      mediaAlt: media.alt,
      mediaId: media.id,
      mediaUrl: media.url,
      mediaType,
      focalPoint: undefined,
    } );
  };
}
