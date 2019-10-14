// eslint-disable-next-line no-unused-vars
const vscode = require('vscode');

var intellisenses = []

// eslint-disable-next-line no-unused-vars
module.exports = function(context, sync) {
    if(sync) {
        intellisenses = []
    }

    if(intellisenses.length == 0) {
        intellisenses = [].concat.apply([], require(`./keepalived-intellisense-db.json`));   
    }
    
    return intellisenses;
};
