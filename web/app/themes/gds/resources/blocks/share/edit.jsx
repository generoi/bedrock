/** @wordpress */
import { __ } from '@wordpress/i18n'
import {
  useBlockProps,
} from '@wordpress/block-editor'

function BlockEdit() {
  return (
    <>
      <div { ...useBlockProps({}) }>
        <toggle-button class="wp-block-gds-share__button">
          <span className="wp-block-gds-share__button-label">
            {__('Share', 'gds')}
          </span>
          <i className="far fa-share-alt fa-sm"></i>
        </toggle-button>
      </div>
    </>
  )
}

export default BlockEdit;
