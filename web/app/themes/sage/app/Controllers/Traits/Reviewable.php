<?php

namespace App\Controllers\Traits;

trait Reviewable
{
    public function has_review_rating()
    {
        return get_option('woocommerce_enable_review_rating') === 'yes';
    }

    public function comment_form($args = [])
    {
        return $this->review_form($args);
    }

    /**
     * Simplified review form using Foundation classes.
     *
     * @see https://github.com/woocommerce/woocommerce/blob/master/templates/single-product-reviews.php
     * @return string
     */
    public function review_form($args = [])
    {
        $commenter = wp_get_current_commenter();
        $comment_form = array_merge([
            'title_reply'          => __('Add a review', 'woocommerce'),
            'title_reply_to'       => __('Leave a Reply to %s', 'woocommerce'),
            'title_reply_before'   => '<h5 id="reply-title" class="comment-reply-title">',
            'title_reply_after'    => '</h5>',
            'comment_notes_before'  => '',
            'comment_notes_after'  => '',
            'fields'               => [
                'author' => ''
                    . '<div class="grid-x grid-margin-x">'
                    . '<div class="cell medium-auto comment-form-author">'
                    . '<label for="author">' . esc_html__('Name', 'woocommerce') . ' <span class="form-required">*</span></label>'
                    . '<input id="author" name="author" type="text" value="' . esc_attr($commenter['comment_author']) . '" size="30" aria-required="true" required />'
                    . '</div>',
                'email' => ''
                    . '<div class="cell medium-auto comment-form-email">'
                    . '<label for="email">' . esc_html__('Email', 'woocommerce') . ' <span class="form-required">*</span></label>'
                    . '<input id="email" name="email" type="email" value="' . esc_attr($commenter['comment_author_email']) . '" size="30" aria-required="true" required />'
                    . '</div>'
                    . '</div>',
            ],
            'label_submit'  => __('Submit', 'woocommerce'),
            'class_submit'  => 'button button--primary',
            'logged_in_as'  => '',
            'comment_field' => '',
        ], $args);
        if ($account_page_url = wc_get_page_permalink('myaccount')) {
            $comment_form['must_log_in'] = '<div class="must-log-in">' . sprintf(__('You must be <a href="%s">logged in</a> to post a review.', 'woocommerce'), esc_url($account_page_url)) . '</div>';
        }
        if ($this->has_review_rating) {
            $comment_form['comment_field'] = '<div class="comment-form-rating"><label for="rating">' . esc_html__('Your rating', 'woocommerce') . '</label><select name="rating" id="rating" aria-required="true" required>
                <option value="">' . esc_html__('Rate&hellip;', 'woocommerce') . '</option>
                <option value="5">' . esc_html__('Perfect', 'woocommerce') . '</option>
                <option value="4">' . esc_html__('Good', 'woocommerce') . '</option>
                <option value="3">' . esc_html__('Average', 'woocommerce') . '</option>
                <option value="2">' . esc_html__('Not that bad', 'woocommerce') . '</option>
                <option value="1">' . esc_html__('Very poor', 'woocommerce') . '</option>
            </select></div>';
        }
        $comment_form['comment_field'] .= '<div class="comment-form-comment"><label for="comment">' . esc_html__('Your review', 'woocommerce') . ' <span class="form-required">*</span></label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true" required></textarea></div>';
        return comment_form(apply_filters('woocommerce_product_review_comment_form_args', $comment_form));
    }
}
