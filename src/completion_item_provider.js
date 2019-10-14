const vscode = require('vscode');
const intellisense_db = require('./intellisense_db');

var completionItems = []
var intellisenseDB = []

function resolveBlock(document, position) {
	let lineNum = position.line, stack = 0, match, line = '', commentMark;
	while (--lineNum >= 0) {
		line = document.lineAt(lineNum).text;

		commentMark = line.indexOf('#');
		if (commentMark >= 0) line = line.slice(0, commentMark);

		line = line.trim();

		if (line == '}') stack++;

		if (match = line.match(/^(\w+)\s+.*\{$/)) {
			if(!stack)
				return match[1];
			stack--;
		}
	}
};

// eslint-disable-next-line no-unused-vars
function provideCompletionItems(document, position, token, context) {
	var range = new vscode.Range(
		new vscode.Position(position.line, 0), position);
	let inputText = document.getText(range).match(/(?:^|;)\s*(\w*)$/),
		directiveNamePrefix = inputText && inputText[1],
		blockName = resolveBlock(document, position);

	if (inputText) {
		return completionItems.filter(item => {
			if (blockName && item.contexts.indexOf(blockName) == -1) {
				return false;
			}

			if (item.label.startsWith(directiveNamePrefix)) return true;
		});
	}
}

// eslint-disable-next-line no-unused-vars
function resolveCompletionItem(item, token) {
	return null;
}

module.exports = function(context) {

	intellisenseDB = new intellisense_db()

	// eslint-disable-next-line no-unused-vars
	intellisenseDB.forEach((item, index) => {
		let compItem = new vscode.CompletionItem(item.name,
				vscode.CompletionItemKind.Property);
			compItem.documentation = item.syntax.join('\n') + '\n' + item.desc;

		compItem.insertText = new vscode.SnippetString(
			item.default ? item.default.replace(/^(\w+)(\s+)(.+);$/, '$1$2$${params:$3}')
				: item.name);

		compItem.sortText = compItem.label;
		compItem.contexts = item.contexts || [];
		completionItems.push(compItem);
	});

	// 注册代码自动补齐，仅当按下“.”时才触发
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('keepalivedconf', {
		provideCompletionItems,
		resolveCompletionItem
	}, '.'));
};