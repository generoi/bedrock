import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody, SelectControl} from '@wordpress/components';
import {useSelect} from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

function BlockEdit({attributes, setAttributes}) {
  const {menus, hasResolved} = useSelect((select) => {
    const menus = select('core').getEntityRecords('taxonomy', 'nav_menu');
    const hasResolved = select('core').hasFinishedResolution(
      'getEntityRecords',
      ['taxonomy', 'nav_menu'],
    );

    return {menus, hasResolved};
  }, []);

  const selectedMenu =
    hasResolved && menus?.find((menu) => menu.slug === attributes.menu);

  const controls = (
    <InspectorControls>
      <PanelBody title="Menu">
        <SelectControl
          label="Menu"
          value={attributes.menu}
          options={
            hasResolved && menus ?
              menus.map((menu) => ({label: menu.name, value: menu.slug}))
            : []
          }
          onChange={(menu) => setAttributes({menu})}
        />
        {selectedMenu && (
          <p>
            <a
              href={`/wp/wp-admin/nav-menus.php?action=edit&menu=${selectedMenu?.id}`}
              rel="noreferrer"
              target="_blank"
            >
              Edit it here
            </a>
          </p>
        )}
      </PanelBody>
    </InspectorControls>
  );

  return (
    <>
      {controls}
      <ServerSideRender block="gds/menu" attributes={attributes} />
    </>
  );
}

export default BlockEdit;
