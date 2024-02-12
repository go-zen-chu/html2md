import { expect, describe, test } from '@jest/globals';
import { html2mdConvertContentToMarkdown } from './html2md.user';
import TurndownService from 'turndown';

describe('html2mdConvertContentToMarkdown', () => {
    test('if valid html given, it should sanitize and format to markdown', () => {
        const testHtml = `
<div id="content">
<div> script should be removed
    <script>
        console.log('hello world');
    </script>
</div>

<div> style should be removed
    <style>
        body {
            color: red;
        }
    </style>
</div>

<div> header div should be removed
    <div class="header">
        <span>this is cool header in contents</span>
    </div>
</div>

</div>
`;
        const expected = `script should be removed

style should be removed

header div should be removed`;
        const turndownService = new TurndownService();
        const markdown = html2mdConvertContentToMarkdown(turndownService, testHtml);
        expect(markdown).toBe(expected);
    });
});  
