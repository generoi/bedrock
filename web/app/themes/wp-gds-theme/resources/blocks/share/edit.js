/** @wordpress */
import { __ } from '@wordpress/i18n'
import {
  useBlockProps,
} from '@wordpress/block-editor'

function BlockEdit(props) {
  return (
    <>
      <div { ...useBlockProps({}) }>
        <toggle-button>
          {__('Share', 'gds')}
          <i className="far fa-share-alt fa-sm"></i>
        </toggle-button>
      </div>
    </>
  )
}

export default BlockEdit;
