/* eslint-env mocha */
/* eslint-env node */

var assert = require('assert');
var MarkdownRenderer = require('../src/markdown-toolbar.js').MarkdownRenderer;

describe('MarkdownRenderer', function() {
    it('should render its input with commonmark', function() {
        var r = new MarkdownRenderer();
        assert.equal(r.render('* abc'), '<ul>\n<li>abc</li>\n</ul>\n');
    });
});
