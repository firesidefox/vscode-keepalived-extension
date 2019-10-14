/*
    file: hover_provider.js
 */
const vscode = require('vscode');
const intellisense_db = require('./intellisense_db');

var intellisenseDB = []

module.exports = function(context) {
    intellisenseDB = new intellisense_db()

	// 注册悬停提示
    context.subscriptions.push(vscode.languages.registerHoverProvider('keepalivedconf',
    {
        provideHover: (document, position) => {
            let lineText = document.lineAt(position).text,
                beforeText = lineText.slice(0, position.character),
                afterText = lineText.slice(position.character);
            
            beforeText = beforeText.match(/\w*$/)[0] || ''
            afterText = afterText.match(/^\w*/)[0] || ''

            let selectText = beforeText + afterText;
            if(selectText.length == 0) {
                return null
            }
            
            for (var item of intellisenseDB) {
                if (item.name != selectText) {
                    continue
                }

                let hover = [ item.name ];
                if( item.default ) {
                    hover.push(`Default: ${item.default}`);
                }
                hover.push(item.desc);
                return new vscode.Hover(hover.concat(item.notes));
            }
        }
    }));
};
