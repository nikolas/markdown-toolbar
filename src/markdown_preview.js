/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

define([
    '../libs/commonmark.min',
    '../libs/js-emoji/emoji.min',
    '../libs/linkify/linkify.min',
    '../libs/linkify/linkify-html.min'
], function(commonmark, emoji) {
    var MarkdownPreview = function($textarea, $previewArea) {
        this.reader = commonmark.Parser();
        this.writer = commonmark.HtmlRenderer();
        this.$textarea = $textarea;
        this.$previewArea = $previewArea;
        this._startEventHandler();
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
     * Refresh the markdown preview, given the source text.
     */
    MarkdownPreview.prototype.refresh = function(text) {
        var parsed = this.reader.parse(text);
        var rendered = this.writer.render(parsed);
        if (typeof window.linkifyHtml === 'function') {
            rendered = window.linkifyHtml(rendered);
        }
        if (typeof emoji.replace_colons === 'function') {
            rendered = emoji.replace_colons(rendered);
        }
        this.$previewArea.html(rendered);
    };

    MarkdownPreview.prototype._startEventHandler = function() {
        var me = this;
        this.$textarea.on('change keyup', function(e) {
            var comment = $(e.target).val();
            me.refresh(comment);
        });
    };

    return MarkdownPreview;
});
