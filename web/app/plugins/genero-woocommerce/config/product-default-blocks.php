<?php

/**
 * Default block template for the product post type (block editor).
 *
 * Gallery: full `woocommerce/product-gallery` tree (large image, product-image, sale badge,
 * next/previous, thumbnails). No related-products pattern here — that pattern is heavy and
 * contributed to memory blow-ups when combined with style pre-rendering.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/
 */
return [
    [
        'genero-woocommerce/woo-product',
        [
            'lock' => [
                'move' => true,
                'remove' => true,
            ],
        ],
        [
            [
                'woocommerce/single-product',
                [
                    'lock' => [
                        'move' => true,
                        'remove' => true,
                    ],
                    'align' => 'wide',
                ],
                [
                    [
                        'core/columns',
                        [
                            'align' => 'wide',
                        ],
                        [
                            [
                                'core/column',
                                [
                                    'lock' => [
                                        'move' => false,
                                        'remove' => true,
                                    ],
                                ],
                                [
                                    [
                                        'woocommerce/product-gallery',
                                        [
                                            'layout' => [
                                                'type' => 'flex',
                                                'flexWrap' => 'nowrap',
                                                'orientation' => 'vertical',
                                            ],
                                        ],
                                        [
                                            [
                                                'woocommerce/product-gallery-large-image',
                                                [],
                                                [
                                                    [
                                                        'woocommerce/product-image',
                                                        [
                                                            'showProductLink' => false,
                                                            'showSaleBadge' => false,
                                                            'isDescendentOfSingleProductBlock' => true,
                                                        ],
                                                    ],
                                                    [
                                                        'woocommerce/product-sale-badge',
                                                        [
                                                            'align' => 'right',
                                                        ],
                                                    ],
                                                    [
                                                        'woocommerce/product-gallery-large-image-next-previous',
                                                        [],
                                                    ],
                                                ],
                                            ],
                                            [
                                                'woocommerce/product-gallery-thumbnails',
                                                [],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                            [
                                'core/column',
                                [
                                    'lock' => [
                                        'move' => false,
                                        'remove' => false,
                                    ],
                                ],
                                [
                                    [
                                        'core/post-title',
                                        [
                                            'level' => 1,
                                            '__woocommerceNamespace' => 'woocommerce/product-query/product-title',
                                        ],
                                    ],
                                    [
                                        'woocommerce/product-rating',
                                        [
                                            'isDescendentOfSingleProductBlock' => true,
                                        ],
                                    ],
                                    [
                                        'woocommerce/product-price',
                                        [
                                            'fontSize' => 'large',
                                        ],
                                    ],
                                    [
                                        'core/post-excerpt',
                                        [
                                            'excerptLength' => 100,
                                            '__woocommerceNamespace' => 'woocommerce/product-query/product-summary',
                                        ],
                                    ],
                                    [
                                        'woocommerce/add-to-cart-form',
                                        [
                                            'quantitySelectorStyle' => 'stepper',
                                        ],
                                    ],
                                    [
                                        'woocommerce/product-meta',
                                        [],
                                        [
                                            [
                                                'core/group',
                                                [
                                                    'layout' => [
                                                        'type' => 'flex',
                                                        'flexWrap' => 'nowrap',
                                                    ],
                                                ],
                                                [
                                                    [
                                                        'woocommerce/product-sku',
                                                        [],
                                                    ],
                                                    [
                                                        'core/post-terms',
                                                        [
                                                            'term' => 'product_cat',
                                                            'prefix' => 'Category: ',
                                                        ],
                                                    ],
                                                    [
                                                        'core/post-terms',
                                                        [
                                                            'term' => 'product_tag',
                                                            'prefix' => 'Tags: ',
                                                        ],
                                                    ],
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
];
