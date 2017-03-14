/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

define([
    '../../libs/commonmark.min',
    '../../libs/js-emoji/emoji.min',
    '../../libs/linkify/linkify.min',
    '../../libs/linkify/linkify-html.min'
], function(commonmark, emoji) {

    var MarkdownRenderer = function() {
        this.reader = new commonmark.Parser();
        this.writer = new commonmark.HtmlRenderer();
        if (window.STATIC_URL) {
            emoji.sheet_path = window.STATIC_URL +
                'emoji-data/sheet_apple_64.png';
        }
        emoji.use_sheet = true;
        // Temporary workaround for img_path issue:
        // https://github.com/iamcal/js-emoji/issues/47
        emoji.img_sets[emoji.img_set].sheet = emoji.sheet_path;
    };

    /**
     * MarkdownRenderer.render does a few things to its input text:
     * - Renders the text with CommonMark
     * - Transforms emojis
     * - Turns URLs into <a> tags
     */
    MarkdownRenderer.prototype.render = function(text) {
        var parsed = this.reader.parse(text);
        var rendered = this.writer.render(parsed);
        if (typeof window.linkifyHtml === 'function') {
            rendered = window.linkifyHtml(rendered);
        }
        if (typeof emoji.replace_colons === 'function') {
            rendered = emoji.replace_colons(rendered);
        }
        return rendered;
    };

    return MarkdownRenderer;
});
