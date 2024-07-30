/** @wordpress */
import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import {
  PanelBody,
  ToggleControl,
  ToolbarButton,
  ToolbarGroup,
  Popover,
} from '@wordpress/components';
import {
  BlockControls,
  InspectorControls,
  RichText,
  __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

function URLPicker({isSelected, url, opensInNewTab, onChange}) {
  const [isURLPickerOpen, setIsURLPickerOpen] = useState(false);
  const urlIsSet = !!url;
  const urlIsSetandSelected = urlIsSet && isSelected;
  const openLinkControl = () => {
    setIsURLPickerOpen(true);
    return false; // prevents default behaviour for event
  };
  const unlinkButton = () => {
    onChange({
      url: undefined,
      opensInNewTab: undefined,
    });
    setIsURLPickerOpen(false);
  };
  const linkControl = (isURLPickerOpen || urlIsSetandSelected) && (
    <Popover position="bottom center" onClose={() => setIsURLPickerOpen(false)}>
      <LinkControl
        className="wp-block-navigation-link__inline-link-input"
        value={{url, opensInNewTab}}
        onChange={onChange}
      />
    </Popover>
  );

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          {!urlIsSet && (
            <ToolbarButton
              name="link"
              icon="admin-links"
              title={__('Link')}
              onClick={openLinkControl}
            />
          )}
          {urlIsSetandSelected && (
            <ToolbarButton
              name="link"
              icon="editor-unlink"
              title={__('Unlink')}
              onClick={unlinkButton}
              isActive={true}
            />
          )}
        </ToolbarGroup>
      </BlockControls>
      {linkControl}
    </>
  );
}

function LinkButton(props) {
  const {
    label,
    opensInNewTab,
    setUrl,
    setLabel,
    setOpensInNewTab,
    placeholder,
    className,
  } = props;

  return (
    <>
      <div className={`wp-block-button wp-block-button__link ${className}`}>
        <RichText
          placeholder={placeholder}
          value={label}
          onChange={(value) => setLabel(value)}
        />
      </div>

      <URLPicker
        onChange={({url, opensInNewTab}) => {
          setUrl(url);
          setOpensInNewTab(opensInNewTab);
        }}
        {...props}
      />

      <InspectorControls>
        <PanelBody title={__('Link settings')}>
          <ToggleControl
            label={__('Open in new tab')}
            onChange={(value) => {
              setOpensInNewTab(!value);
            }}
            checked={opensInNewTab}
          />
        </PanelBody>
      </InspectorControls>
    </>
  );
}

export default LinkButton;
