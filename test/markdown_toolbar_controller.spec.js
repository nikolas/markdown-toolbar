define([
    '../src/utils/markdown_toolbar_controller'
], function(MarkdownToolbarController) {
    test('should render prefixes correctly', function() {
        var text = 'abcdefg';
        var d = {
            'prefix': '**'
        };
        var rendered = '**abcdefg';
        var c = new MarkdownToolbarController();
        strictEqual(c.renderPrefix(0, 7, d, text), rendered);
    });

    test('should render suffixes correctly', function() {
        var text = 'abcdefg';
        var d = {
            'suffix': '**'
        };
        var rendered = 'abcdefg**';
        var c = new MarkdownToolbarController();
        strictEqual(c.renderSuffix(0, 7, 2, d, text), rendered);
    });

    test('should render block prefixes correctly', function() {
        var text = 'abcc';
        var d = {
            'blockPrefix': '```'
        };
        var rendered = '```\nabcc';
        var c = new MarkdownToolbarController();
        strictEqual(c.renderBlockPrefix(0, 0, d, text), rendered);
    });

    test('should render block suffixes correctly', function() {
        var text = 'abcc';
        var d = {
            'blockSuffix': '```'
        };
        var rendered = 'abcc\n```';
        var c = new MarkdownToolbarController();
        strictEqual(c.renderBlockSuffix(0, 0, 3, d, text), rendered);
    });

    test('should render bold selections correctly', function() {
        var text = 'abcdef';
        var data = {
            'prefix': '**',
            'suffix': '**'
        };
        var rendered = 'abcdef****';
        var c = new MarkdownToolbarController();
        strictEqual(c.render(data, 6, 6, text), rendered);
        strictEqual(c.selectionStart, 8);
        strictEqual(c.selectionEnd, 8);


        text = 'abcdef';
        rendered = '**abcdef**';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, 6, text), rendered);
        strictEqual(c.selectionStart, 2);
        strictEqual(c.selectionEnd, 8);

        text = 'abcdef\nabcdef\n';
        rendered = '**abcdef**\nabcdef\n';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, 6, text), rendered);
        strictEqual(c.selectionStart, 2);
        strictEqual(c.selectionEnd, 8);

        text = 'abcdef\nabcdef\n';
        rendered = '**abcdef\nabcdef**\n';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, 13, text), rendered);
        strictEqual(c.selectionStart, 2);
        strictEqual(c.selectionEnd, 15);
    });

    test('should render code selections correctly', function() {
        var text = 'abcdef';
        var data = {
            'prefix': '`',
            'suffix': '`',
            'blockPrefix': '```',
            'blockSuffix': '```'
        };
        var rendered = 'abcdef``';
        var c = new MarkdownToolbarController();
        strictEqual(c.render(data, 6, 6, text), rendered);
        strictEqual(c.selectionStart, 7);
        strictEqual(c.selectionEnd, 7);

        text = 'abcdef';
        rendered = '`abcdef`';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, 6, text), rendered);
        strictEqual(c.selectionStart, 1);
        strictEqual(c.selectionEnd, 7);

        text = 'abcdef\nabcdef\n';
        rendered = '`abcdef`\nabcdef\n';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, 6, text), rendered);
        strictEqual(c.selectionStart, 1);
        strictEqual(c.selectionEnd, 7);

        text = 'abcdef\nabcdef\n';
        rendered = '```\nabcdef\nabcdef\n\n```';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, 13, text), rendered);
        strictEqual(c.selectionStart, 4);
        strictEqual(c.selectionEnd, 17);
    });

    test('should render lists correctly', function() {
        var text = 'abcdef';
        var data = {
            'prefix': '- ',
            'multiline': true
        };
        var rendered = 'abcdef- ';
        var c = new MarkdownToolbarController();
        strictEqual(c.render(data, text.length, text.length, text), rendered);
        strictEqual(c.selectionStart, 0);
        strictEqual(c.selectionEnd, 8);

        text = 'abcdef';
        rendered = '- abcdef';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, text.length, text), rendered);
        strictEqual(c.selectionStart, 0);
        strictEqual(c.selectionEnd, 8);

        text = 'abcdef\nabcdef';
        rendered = '- abcdef\n- abcdef';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, 13, text), rendered);
        strictEqual(c.selectionStart, 0);
        strictEqual(c.selectionEnd, 17);

        text = 'abcdef\nabcdef\n';
        rendered = '- abcdef\n- abcdef\n- ';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, text.length, text), rendered);
        strictEqual(c.selectionStart, 0);
        strictEqual(c.selectionEnd, 20);

        text = 'abcd\nabcd\nabc';
        rendered = '- abcd\n- abcd\n- abc';
        c = new MarkdownToolbarController();
        strictEqual(c.render(data, 0, text.length, text), rendered);
        strictEqual(c.selectionStart, 0);
        strictEqual(c.selectionEnd, 19);
    });
});
