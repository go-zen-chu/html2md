// ==UserScript==
// @name         html2md
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  convert html page to markdown and store to clipboard
// @author       Akira Masuda
// @match        https://*/**
// @updateURL    https://raw.githubusercontent.com/go-zen-chu/html2md/main/html2md.user.js
// @downloadURL  https://raw.githubusercontent.com/go-zen-chu/html2md/main/html2md.user.js
// @icon         https://img.icons8.com/?size=160&id=50145&format=png
// @run-at       context-menu
// @grant        GM_setClipboard
// @require      https://unpkg.com/turndown/dist/turndown.js
// ==/UserScript==
'use strict';

(function () {
    // will be skipped when running test
    if (typeof window !== 'undefined') {
        console.log(window);
        const mainContent = document.getElementById('content');
        if (mainContent) {
            const turndownService = new TurndownService();
            const markdownContent = html2mdConvertContentToMarkdown(turndownService, mainContent.innerHTML);
            GM_setClipboard(markdownContent, "text");
            console.log('markdown content copied to clipboard.');
        }
        else {
            console.error('element with id "content" not found in this page.');
        }
    }
})();

function html2mdConvertContentToMarkdown(turndownService, html) {
    turndownService.remove('script');
    turndownService.remove('style');
    var ignoreDivClass = new Set(['header', 'footer']);
    turndownService.remove(function (node, options) {
        if (node.nodeName === 'DIV') {
            const divcls = node.getAttribute('class');
            if (divcls && ignoreDivClass.has(divcls)) {
                return true;
            }
        }
        return false;
    });
    var md = turndownService.turndown(html);
    const lines = md.split('\n');
    const spaceTrimmedLines = lines.map((line) => line.trimEnd());
    return spaceTrimmedLines.join('\n');
}
module.exports = html2mdConvertContentToMarkdown;
