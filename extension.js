// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const { logger } = require("./lib/logger");
const { computeIdentifierDensity } = require('./lib/computeIdentifierDensity');
const { createMarkdownDocument } = require('./lib/createMarkdownDocument');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// your extension is activated the very first time the command is executed
	logger.log('Extension activated');

	// The command has been defined in the package.json file
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('js-word-counter.computeIdentifierDensity', async () => {
		if (!vscode.window.activeTextEditor) {
			return;
		}

		const { fileName } = vscode.window.activeTextEditor.document;

		logger.log(`Processing "${fileName}"...`);

		const code = vscode.window.activeTextEditor.document.getText();

		try {
			const results = computeIdentifierDensity(code);

			logger.log(`"${fileName}" results →`, results);

			vscode.window.showInformationMessage('JS identifier density computed!');

			const newDocument = await vscode.workspace.openTextDocument({
				content: createMarkdownDocument({ fileName, results }),
				language: 'markdown',
			});

			vscode.window.showTextDocument(newDocument);
		} catch(error) {
			logger.error(error);
			vscode.window.showErrorMessage(`Error while computing JS identifier density: ${error.message}!`);
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
