const vscode = require('vscode');

const { logger } = require("./logger");
const { computeIdentifierDensity } = require('./computeIdentifierDensity');
const { createMarkdownDocument } = require('./createMarkdownDocument');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// your extension is activated the very first time the command is executed
	logger.log('Extension activated');

	// The command has been defined in the package.json file
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('js-word-counter.computeIdentifierDensity', async () => {
		const { activeTextEditor } = vscode.window;

		if (!activeTextEditor || !activeTextEditor.document) {
			return;
		}

		const { languageId, fileName } = activeTextEditor.document;

		if (languageId !== 'javascript') {
			vscode.window.showWarningMessage(`Cannot compute JS identifier density for "${languageId}" language!`);
			return;
		}

		logger.log(`Processing "${fileName}"...`);

		const code = activeTextEditor.document.getText();

		try {
			const results = computeIdentifierDensity(code);

			logger.log(`"${fileName}" results →`, results);

			vscode.window.showInformationMessage(`JS identifier density computed (${results.totalCount})!`);

			logger.log('Creating Markdown document...');

			const newDocument = await vscode.workspace.openTextDocument({
				content: createMarkdownDocument({ fileName, results }),
				language: 'markdown',
			});

			vscode.window.showTextDocument(newDocument);

			logger.log('Opening Markdown preview...');

			await vscode.commands.executeCommand('markdown.showPreviewToSide');

			logger.log('Done!');
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
