define([
    'jquery',
    'utils/markdown_toolbar_controller'
], function($, MarkdownToolbarController) {
    var MarkdownToolbar = function($toolbar, $textarea, markdownPreview) {
        this.$toolbar = $toolbar;
        this.$textarea = $textarea;
        this.markdownPreview = markdownPreview;
        this.lastHotkey = null;
        this.lastText = null;
        this.init();
    };

    MarkdownToolbar.prototype.init = function() {
        var me = this;

        this.$toolbar.find('button.js-toolbar-item').on('click', function(e) {
            var $this = $(this);

            // Get data from button element
            var buttonData = $this.data();

            // Get cursor position and textarea's text
            var selectionStart = me.$textarea[0].selectionStart;
            var selectionEnd = me.$textarea[0].selectionEnd;
            var text = me.$textarea.val();

            if (buttonData.hotkey === me.lastHotkey && me.lastText) {
                var diff = text.length - me.lastText.length;
                selectionStart -= diff / 2;
                selectionEnd -= diff / 2;
                text = me.lastText;
                me.lastHotkey = null;
            } else {
                var mtc = new MarkdownToolbarController();
                me.lastText = text;
                text = mtc.render(
                    buttonData, selectionStart, selectionEnd, text);
                selectionStart = mtc.selectionStart;
                selectionEnd = mtc.selectionEnd;
                me.lastHotkey = buttonData.hotkey;
            }

            me.$textarea.val(text);

            // Reset cursor to original state
            me.$textarea[0].setSelectionRange(selectionStart, selectionEnd);
            me.$textarea.focus();

            // Refresh the preview view if it exists.
            if (me.markdownPreview &&
                typeof me.markdownPreview.refresh === 'function'
               ) {
                me.markdownPreview.refresh(me.$textarea.val());
            }
        });

        this.$textarea.on('keyup', function(e) {
            me.lastHotkey = null;
        });
    };

    return MarkdownToolbar;
});
