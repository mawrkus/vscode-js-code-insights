const { languages } = require('./languages');

exports.createMarkdownDocument = ({ fileName, results, languageId }) => {
	const {  totalCount, frequencies } = results;

	return `
## 💡 JS identifiers analysis

- File → [${fileName}](${fileName})
- Language → ${languages[languageId].name}
- Number of identifiers → ${totalCount}

### Identifier density

| Name | Density (%) | Count | Context |
| ---  | ---         | ---   | ---     |
${frequencies
		.map(([name, count, f, context]) => `| ${name} | ${(Math.round(f * 100) / 100).toFixed(2)} | ${count} | ${context.join(', ')} |`)
		.join('\n')
};
	`;
};
