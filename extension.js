// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const computeIdentifierDensity = require('./lib/computeIdentifierDensity');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('The JS Word Counter extension is now active');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('js-word-counter.computeIdentifierDensity', function () {
		try {
			const result = computeIdentifierDensity('let solution = 42; ((value) => solution === value)(value);');
			console.log(result);
			vscode.window.showInformationMessage('JS identifier density computed!');
		} catch(error) {
			console.error(error);
			vscode.window.showErrorMessage(`Error while computing JS identifier density: ${error.message}!`);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};
