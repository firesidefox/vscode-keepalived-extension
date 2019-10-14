const vscode = require('vscode');
const sync_keepalived_manpage = require('./sync_keepalived_manpage');
const intellisense_db = require('./intellisense_db')
const hover_provider = require('./hover_provider')
const sync_command = require('./sync_command')
const completion_item_provider = require('./completion_item_provider');


// 第一次执行命令时，插件会被激活；插件被激活时，这个函数会被调用
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Your extension "keepalivedconf" is now active!');

	// 读取配置
	const autosync = vscode.workspace.getConfiguration().get('keepalivedconf.autosync');

	// 同步 keepalived mainpage.html
	// 	并由此生成智能提示数据库 keepalived-intellisense-db.json
	new sync_keepalived_manpage(context, autosync);
	// 加载智能提示数据库
	new intellisense_db(context);
	// 创建命令模块：extension.sync
	new sync_command(context);
	// 创建自动补齐模块
	new completion_item_provider(context);
	// 创建悬停提示模块
	new hover_provider(context);

	// 监听配置变化
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
		console.log('配置发生变化！');
		const autosync = vscode.workspace.getConfiguration().get('keepalivedconf.autosync');
		if(autosync) {
			console.log('配置自动更新数据库。立即重新加载配置。"keepalivedconf.autosync:' + autosync + '"')
			
			// 同步 keepalived mainpage.html
			// 	并由此生成智能提示数据库 keepalived-intellisense-db.json
			// 最终加载到内存
			new sync_keepalived_manpage(context, true);
			new intellisense_db(context, true)
		}
		
	}));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
