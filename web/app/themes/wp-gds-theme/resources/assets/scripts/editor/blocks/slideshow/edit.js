import classnames from 'classnames';
import dropRight from 'lodash-es/dropRight';
import times from 'lodash-es/times';
import SwiperCore, { Navigation, Pagination, A11y, Swiper } from 'swiper';

import { __ } from '@wordpress/i18n';
import {
  withColors,
  BlockControls,
  InspectorControls,
  useBlockProps,
  __experimentalUseInnerBlocksProps as useInnerBlocksProps,
  __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor'

import {
  PanelBody,
  RangeControl,
  ToggleControl,
  Toolbar,
} from '@wordpress/components';

import { createBlock } from '@wordpress/blocks';
import { useRef, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

SwiperCore.use([Navigation, Pagination, A11y]);

const getSlidesTemplate = (slides) => {
  const result = [];
  for (let i = 1; i <= slides; i++) {
      result.push(['gds/slideshow-slide' ] );
  }
  return result;
};

function BlockEdit({
  attributes,
  setAttributes,
  arrowColor,
  setArrowColor,
  backgroundColor,
  setBackgroundColor,
  textColor,
  setTextColor,
  clientId,
}) {
  const {
    hasArrowsOutside,
    hasPagination,
    hasNavigation,
    isAutoplay,
    isLoop,
    slides,
  } = attributes;
  const containerRef = useRef();
  const paginationRef = useRef();
  const prevElRef = useRef();
  const nextElRef = useRef();
  const [containerClasses, setContainerClasses] = useState('swiper-container');
  const [swiper, setSwiper] = useState(null);

  const swiperConfig = () => {
    const config = {
      _emitClasses: true,
      autoplay: isAutoplay,
      loop: isLoop,
      autoHeight: true,
      slidesPerView: 3,
      simulateTouch: false,
      cssMode: true, // gutenberg resets transform on innerblock wrapper
      pagination: {
        el: hasPagination ? paginationRef.current : null,
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        prevEl: hasNavigation ? prevElRef.current : null,
        nextEl: hasNavigation ? nextElRef.current : null,
      },
      on: {
        _containerClasses(swiper, classes) {
          setContainerClasses(classes);
        },
      },
    };

    return config;
  };

  useEffect(() => {
    if (swiper) {
      swiper.destroy();
    }
    setSwiper(new Swiper(containerRef.current, swiperConfig()));
    console.log('create');
  }, []);

  useEffect(() => {
    if (!swiper || swiper.destroyed) {
      return;
    }

    swiper.update();
  });

  const { replaceInnerBlocks } = useDispatch('core/block-editor');
  let innerBlocks = useSelect(
    (select) => select('core/block-editor').getBlocks(clientId),
    [clientId]
  );

  const updateSlides = (previousSlides, newSlides) => {
    const isAddingSlide = newSlides > previousSlides;
    if (isAddingSlide) {
      innerBlocks = [
        ...innerBlocks,
        ...times(newSlides - previousSlides, () => {
          return createBlock('gds/slideshow-slide');
        }),
      ];
    } else {
      innerBlocks = dropRight(innerBlocks, previousSlides - newSlides);
    }

    replaceInnerBlocks(clientId, innerBlocks, false);
    setAttributes({slides: innerBlocks.length});
  };

  const moveSlide = (previousIndex, newIndex) => {
    const block = innerBlocks.splice(previousIndex, 1)[0];

    innerBlocks = [
      ...innerBlocks.slice(0, newIndex) || [],
      block,
      ...(innerBlocks.slice(newIndex) || []),
    ];

    replaceInnerBlocks(clientId, innerBlocks, false);
  };

  const removeSlide = (index) => {
    innerBlocks.splice(index, 1);
    replaceInnerBlocks(clientId, innerBlocks, false);
    setAttributes({slides: innerBlocks.length});
  };

  const controls = (
    <>
      <BlockControls>
        <Toolbar
          controls={ [{
            icon: 'minus',
            title: __('Remove slide'),
            onClick: () => {
              removeSlide(swiper.activeIndex)
              if (swiper.isEnd) {
                setTimeout(() => swiper.slideTo(0));
              }
            },
          }, {
            icon: 'plus',
            title: __('Add slide'),
            onClick: () => {
              updateSlides(slides, slides + 1);
              moveSlide(slides, swiper.activeIndex + 1);
              setTimeout(() => swiper.slideTo(swiper.activeIndex + 1));
            },
          }, {
            icon: 'arrow-left-alt2',
            title: __('Move slide left'),
            onClick: () => {
              if (swiper.isBeginning) {
                return;
              }
              moveSlide(swiper.activeIndex, swiper.activeIndex - 1);
              setTimeout(() => swiper.slideTo(swiper.activeIndex - 1));
            },
          }, {
            icon: 'arrow-right-alt2',
            title: __('Move slide right'),
            onClick: () => {
              if (swiper.isEnd) {
                return;
              }
              moveSlide(swiper.activeIndex, swiper.activeIndex + 1);
              setTimeout(() => swiper.slideTo(swiper.activeIndex + 1));
            },
          }] }
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody title={ __('Slideshow Settings') }>
          <RangeControl
            label={ __('Slide count') }
            value={ slides }
            onChange={ (value) => updateSlides(slides, value) }
            min={ 1 }
            max={ 12 }
          />
          <ToggleControl
            label={ __('Show arrow navigation') }
            checked={ hasNavigation }
            onChange={ () => setAttributes({
              hasNavigation: !hasNavigation,
            }) }
          />
          { hasNavigation && (
            <ToggleControl
              label={ __('Show arrows outside container') }
              checked={ hasArrowsOutside }
              onChange={ () => setAttributes({
                hasArrowsOutside: !hasArrowsOutside,
              }) }
            />
          ) }
          <ToggleControl
            label={ __('Show dot pagination') }
            checked={ hasPagination }
            onChange={ () => setAttributes({
              hasPagination: !hasPagination,
            }) }
          />
          <ToggleControl
            label={ __('Autoplay') }
            checked={ isAutoplay }
            onChange={ () => setAttributes({
              isAutoplay: !isAutoplay,
            }) }
          />
          <ToggleControl
            label={ __('Loop') }
            checked={ isLoop }
            onChange={ () => setAttributes({
              isLoop: !isLoop,
            }) }
          />
        </PanelBody>
        <PanelColorGradientSettings
          title={ __('Colors') }
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
            {
              colorValue: arrowColor.color,
              onColorChange: setArrowColor,
              label: __('Arrow color'),
            },
          ] }
        >
        </PanelColorGradientSettings>
      </InspectorControls>
    </>
  );

  console.log('rerender');

  const containerBlockProps = useBlockProps({
    ref: containerRef,
    className: classnames(containerClasses, {
      'has-arrows-outside': hasArrowsOutside,
      'has-arrow-color': arrowColor.color,
      [ arrowColor.class ]: arrowColor.class,
      'has-background': backgroundColor.color,
      [ backgroundColor.class ]: backgroundColor.class,
      'has-text-color': textColor.color,
      [ textColor.class ]: textColor.class,
    }),
  })

  const innerBlockProps = useInnerBlocksProps(
    { className: 'swiper-wrapper' },
    {
      template: getSlidesTemplate(slides),
      allowedBlocks: ['gds/slideshow-slide'],
    }
  );

  return (
    <>
      { controls }
      <div { ...containerBlockProps }>
        <div { ...innerBlockProps } />

        { hasPagination && (
          <div className="swiper-pagination" ref={ paginationRef }></div>
        ) }
        { hasNavigation && (
          <>
            <div className="swiper-button-prev" ref={ prevElRef }><i className="fa fa-chevron-left fa-3x" aria-hidden></i></div>
            <div className="swiper-button-next" ref={ nextElRef }><i className="fa fa-chevron-right fa-3x" aria-hidden></i></div>
          </>
        ) }
      </div>
    </>
  );
}

export default withColors('arrowColor', 'backgroundColor', {textColor: 'color'})(BlockEdit);
