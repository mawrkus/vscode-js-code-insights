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
	const disposable = vscode.commands.registerCommand('js-code-insights.computeIdentifierDensity', async () => {
		const { activeTextEditor } = vscode.window;

		if (!activeTextEditor || !activeTextEditor.document) {
			return;
		}

		const { languageId, fileName } = activeTextEditor.document;

		if (!['javascript', 'javascriptreact'].includes(languageId)) {
			vscode.window.showWarningMessage(`JS Code Insights - Language "${languageId}" not supported.`);
			return;
		}

		logger.log(`Processing "${fileName}"...`);

		const code = activeTextEditor.document.getText();

		try {
			const results = computeIdentifierDensity({ code, languageId });

			logger.log(`"${fileName}" results →`, results);

			vscode.window.showInformationMessage('JS Code Insights - Identifier density computed.');

			logger.log('Creating Markdown document...');

			const newDocument = await vscode.workspace.openTextDocument({
				content: createMarkdownDocument({ fileName, results, languageId }),
				language: 'markdown',
			});

			vscode.window.showTextDocument(newDocument);

			logger.log('Opening Markdown preview...');

			await vscode.commands.executeCommand('markdown.showPreviewToSide');

			logger.log('Done!');
		} catch(error) {
			logger.error(error);
			vscode.window.showErrorMessage(`JS Code Insights - Error while computing identifier density: ${error.message}!`);
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
