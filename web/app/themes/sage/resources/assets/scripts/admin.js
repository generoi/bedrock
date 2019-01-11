import $ from 'jquery';

const buttons = [
  'blockquote',
  'alignleft',
  'aligncenter',
  'alignright',
  'styleselect',
];

/**
 * Add additional buttons to the text widget editor.
 */
$(document).on('tinymce-editor-setup', (event, editor) => {
  if (editor.settings.toolbar1) {
    buttons.forEach((button) => {
      if (editor.settings.toolbar1.indexOf(button) === -1) {
        editor.settings.toolbar1 += `,${button}`;
      }
    });
  }
});
