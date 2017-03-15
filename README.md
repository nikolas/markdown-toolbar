# markdown-toolbar [![Build Status](https://travis-ci.org/nikolas/markdown-toolbar.svg?branch=master)](https://travis-ci.org/nikolas/markdown-toolbar) [![Greenkeeper badge](https://badges.greenkeeper.io/nikolas/markdown-toolbar.svg)](https://greenkeeper.io/)

A clone of GitHub's markdown toolbar. `markdown-toolbar` can be used as a jQuery plugin that provides a WYSIWYG experience using Markdown syntax. `markdown-toolbar` requires [commonmark.js](https://github.com/jgm/commonmark.js), and also uses [js-emoji](https://github.com/iamcal/js-emoji) if it's available. Calling `.markdownToolbar()` on a `textarea` creates a toolbar above the textarea, and a rendered preview below it, like this:

![markdown-toolbar screenshot](http://www.columbia.edu/~njn2118/journal/img/markdown-toolbar.png)

* Demo: https://nikolas.github.io/markdown-toolbar/
* Background info: http://www.columbia.edu/~njn2118/journal/2016/2/12.html

## Usage

```js
$('textarea.markdown-toolbar').markdownToolbar();
```
