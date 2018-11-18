/* eslint-env mocha */
/* eslint-env node */

var assert = require('assert');
var MarkdownToolbarController = require(
    '../src/markdown-toolbar.js').MarkdownToolbarController;

describe('MarkdownToolbarController', function() {
    it('should render prefixes correctly', function() {
        var text = 'abcdefg';
        var d = {
            'prefix': '**'
        };
        var rendered = '**abcdefg';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.renderPrefix(0, 7, d, text), rendered);
    });

    it('should render suffixes correctly', function() {
        var text = 'abcdefg';
        var d = {
            'suffix': '**'
        };
        var rendered = 'abcdefg**';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.renderSuffix(0, 7, 2, d, text), rendered);
    });

    it('should render block prefixes correctly', function() {
        var text = 'abcc';
        var d = {
            'blockPrefix': '```'
        };
        var rendered = '```\nabcc';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.renderBlockPrefix(0, 0, d, text), rendered);
    });

    it('should render block suffixes correctly', function() {
        var text = 'abcc';
        var d = {
            'blockSuffix': '```'
        };
        var rendered = 'abcc\n```';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.renderBlockSuffix(0, 0, 3, d, text), rendered);
    });

    it('should render bold selections correctly', function() {
        var text = 'abcdef';
        var data = {
            'prefix': '**',
            'suffix': '**'
        };
        var rendered = 'abcdef****';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 6, 6, text), rendered);
        assert.strictEqual(c.selectionStart, 8);
        assert.strictEqual(c.selectionEnd, 8);

        text = 'abcdef';
        rendered = '**abcdef**';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, 6, text), rendered);
        assert.strictEqual(c.selectionStart, 2);
        assert.strictEqual(c.selectionEnd, 8);

        text = 'abcdef\nabcdef\n';
        rendered = '**abcdef**\nabcdef\n';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, 6, text), rendered);
        assert.strictEqual(c.selectionStart, 2);
        assert.strictEqual(c.selectionEnd, 8);

        text = 'abcdef\nabcdef\n';
        rendered = '**abcdef\nabcdef**\n';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, 13, text), rendered);
        assert.strictEqual(c.selectionStart, 2);
        assert.strictEqual(c.selectionEnd, 15);
    });

    it('should render code selections correctly', function() {
        var text = 'abcdef';
        var data = {
            'prefix': '`',
            'suffix': '`',
            'blockPrefix': '```',
            'blockSuffix': '```'
        };
        var rendered = 'abcdef``';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 6, 6, text), rendered);
        assert.strictEqual(c.selectionStart, 7);
        assert.strictEqual(c.selectionEnd, 7);

        text = 'abcdef';
        rendered = '`abcdef`';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, 6, text), rendered);
        assert.strictEqual(c.selectionStart, 1);
        assert.strictEqual(c.selectionEnd, 7);

        text = 'abcdef\nabcdef\n';
        rendered = '`abcdef`\nabcdef\n';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, 6, text), rendered);
        assert.strictEqual(c.selectionStart, 1);
        assert.strictEqual(c.selectionEnd, 7);

        text = 'abcdef\nabcdef\n';
        rendered = '```\nabcdef\nabcdef\n\n```';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 4);
        assert.strictEqual(c.selectionEnd, 18);
    });

    it('should render ul lists correctly', function() {
        var text = 'abcdef';
        var data = {
            'prefix': '- ',
            'multiline': true
        };
        var rendered = 'abcdef- ';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, text.length, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 8);
        assert.strictEqual(c.selectionEnd, 8);

        text = 'abcdef';
        rendered = '- abcdef';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 2);
        assert.strictEqual(c.selectionEnd, 8);

        text = 'abcdef\nabcdef';
        rendered = '- abcdef\n- abcdef';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, 13, text), rendered);
        assert.strictEqual(c.selectionStart, 0);
        assert.strictEqual(c.selectionEnd, 17);

        text = 'abcdef\nabcdef\n';
        rendered = '- abcdef\n- abcdef\n- ';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 0);
        assert.strictEqual(c.selectionEnd, 20);

        text = 'abcd\nabcd\nabc';
        rendered = '- abcd\n- abcd\n- abc';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 0);
        assert.strictEqual(c.selectionEnd, 19);
    });

    it('should render ol lists correctly', function() {
        var text = 'abcdef';
        var data = {
            'prefix': '1. ',
            'multiline': true
        };
        var rendered = 'abcdef1. ';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, text.length, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 9);
        assert.strictEqual(c.selectionEnd, 9);

        text = 'abcdef';
        rendered = '1. abcdef';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 3);
        assert.strictEqual(c.selectionEnd, 9);

        text = 'abcdef\nabcdef';
        rendered = '1. abcdef\n2. abcdef';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, 13, text), rendered);
        assert.strictEqual(c.selectionStart, 0);
        assert.strictEqual(c.selectionEnd, 19);

        text = 'abcdef\nabcdef\n';
        rendered = '1. abcdef\n2. abcdef\n3. ';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 0);
        assert.strictEqual(c.selectionEnd, 23);

        text = 'abcd\nabcd\nabc';
        rendered = '1. abcd\n2. abcd\n3. abc';
        c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 0);
        assert.strictEqual(c.selectionEnd, 22);
    });
    it('should render headers correctly', function() {
        var text = 'abcdef';
        var data = {
            'prefix': '# '
        };
        var rendered = 'abcdef# ';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 6, 6, text), rendered);
        assert.strictEqual(c.selectionStart, 8);
        assert.strictEqual(c.selectionEnd, 8);

        var text = 'abcdef';
        var rendered = '# abcdef';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 0, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 2);
        assert.strictEqual(c.selectionEnd, 8);

        var text = '# abcdef';
        var rendered = '## abcdef';
        var c = new MarkdownToolbarController();
        assert.strictEqual(c.render(data, 2, text.length, text), rendered);
        assert.strictEqual(c.selectionStart, 3);
        assert.strictEqual(c.selectionEnd, 9);

    });
});
