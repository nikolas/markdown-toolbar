/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

define([
    'utils/markdown_renderer'
], function(MarkdownRenderer) {
    var MarkdownPreview = function($textarea, $previewArea) {

        this.renderer = new MarkdownRenderer();
        this.$textarea = $textarea;
        this.$previewArea = $previewArea;
        this._startEventHandler();
    };

    /**
     * Refresh the markdown preview, given the source text.
     */
    MarkdownPreview.prototype.refresh = function(text) {
        var rendered = this.renderer.render(text);
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
