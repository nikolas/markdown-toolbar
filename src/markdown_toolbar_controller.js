/* eslint-env node */

var MarkdownToolbarController = function() {
    this.prefixLength = null;
    this.selectionStart = null;
    this.selectionEnd = null;
};

/**
 * Given a multiline text string, replace the newlines with
 * ascending numbers to make an ordered list.
 */
MarkdownToolbarController.prototype.makeOrderedList = function(text) {
    var lines = text.split(/\r?\n|↵/);
    var i;
    for (i = 0; i < lines.length; i++) {
        lines[i] = (i + 1) + '. ' + lines[i];
        if (i > 0) {
            lines[i] = '\n' + lines[i];
        }
    }
    return lines.join('');
};

MarkdownToolbarController.prototype.render = function(
    d, selectionStart, selectionEnd, text
) {
    var selectedText = text.substr(selectionStart, selectionEnd);
    if (selectedText.match(/\n/) &&
        d.blockPrefix &&
        d.blockSuffix
       ) {
        if (d.blockPrefix) {
            text = this.renderBlockPrefix(
                selectionStart, selectionEnd, d, text);
        }

        if (d.blockSuffix) {
            text = this.renderBlockSuffix(
                selectionStart, selectionEnd, this.prefixLength,
                d, text);
        }
    } else {
        if (d.prefix) {
            text = this.renderPrefix(
                selectionStart, selectionEnd, d, text);
        }

        if (d.suffix) {
            text = this.renderSuffix(
                selectionStart, selectionEnd, this.prefixLength,
                d, text);
        }
    }

    if (d.multiline) {
        this.selectionStart = 0;
        this.selectionEnd = text.length;
    } else {
        this.selectionStart = selectionStart + this.prefixLength;
        this.selectionEnd = selectionEnd + this.prefixLength;
    }

    return text;
};

MarkdownToolbarController.prototype.renderPrefix = function(
    selectionStart, selectionEnd, d, text
) {
    this.prefixLength = d.prefix.length;
    var s;

    if (d.multiline) {
        var before = text.substr(0, selectionStart);
        var snippet = text.substr(selectionStart, selectionEnd);
        var after = text.substr(selectionEnd, text.length);
        if (d.prefix === '1. ') {
            // Create the numbered list
            snippet = this.makeOrderedList(snippet);
        } else {
            snippet = snippet.replace(/^/, d.prefix);
            snippet = snippet.replace(/\n/g, '\n' + d.prefix);
        }
        s = before + snippet + after;
    } else {
        s = text.substr(0, selectionStart);
        s += d.prefix;
        s += text.substr(selectionStart, text.length);
    }
    return s;
};

MarkdownToolbarController.prototype.renderSuffix = function(
    selectionStart, selectionEnd, prefixLength, d, text
) {
    selectionEnd += prefixLength;
    var s = text.substr(0, selectionEnd);
    s += d.suffix;
    s += text.substr(selectionEnd, text.length);
    return s;
};

MarkdownToolbarController.prototype.renderBlockPrefix = function(
    selectionStart, selectionEnd, d, text
) {
    this.prefixLength = d.blockPrefix.length + 1;
    var s = text.substr(0, selectionStart);
    s += d.blockPrefix + '\n';
    s += text.substr(selectionStart, text.length);
    return s;
};

MarkdownToolbarController.prototype.renderBlockSuffix = function(
    selectionStart, selectionEnd, blockPrefixLength, d, text
) {
    selectionEnd += blockPrefixLength + 1;
    var s = text.substr(0, selectionEnd);
    s += '\n' + d.blockSuffix;
    s += text.substr(selectionEnd, text.length);
    return s;
};

if (typeof module !== 'undefined') {
    module.exports = { MarkdownToolbarController: MarkdownToolbarController };
}
