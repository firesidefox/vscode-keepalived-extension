const vscode = require('vscode');
const sync_keepalived_manpage = require('./sync_keepalived_manpage');

module.exports = function(context) {

	// 注册 extension.Sync 命令
    context.subscriptions.push(vscode.commands.registerCommand('extension.sync', function () {
        /* 每一次执行命令，这儿的代码都会执行 */
        vscode.window.showInformationMessage('Triggered Commamd Sync!');
        // 更新 keepalived 智能提示数据库
        new sync_keepalived_manpage(context, true)
    }));
};
